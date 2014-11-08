app.directive('colorPicker', function () {

    return {
    	restrict: 'E',
		templateUrl: '/partials/colorPickerTemplate.html',
		require:'?ngModel',
		link: function (scope, elem, attrs,ngModel) {
			
			scope.colors = [
				{class:"red",isSelected:false},
				{class:"yellow",isSelected:false},
				{class:"green",isSelected:false},
				{class:"purple",isSelected:false},
				{class:"pink",isSelected:false}
			];
			
			scope.updatePicker = function(index){
				for (var i = 0; i < scope.colors.length; i++) {
					scope.colors[i].isSelected=false;
				};
				scope.colors[index].isSelected=true;
			};

			scope.pick = function(index){
				scope.updatePicker(index);
				scope.selectedColorIndex = index;
				if(ngModel)
            	ngModel.$setViewValue(scope.selectedColorIndex);
			};
		
			ngModel.$render = function() {
				var val = parseInt(ngModel.$modelValue);
				console.log(val);
				if(isNaN(val) || val > 4 || val < 0)return;
				scope.updatePicker(val);
        	};
		
		}

    };
});