app.controller('MainController', ['$scope','Counters', function($scope,Counters) {

	$scope.find = function() {		
		Counters.find().then(function(counters) {
            $scope.counters = counters;
        });
	};

	$scope.remove = function(counter){
		Counters.remove(counter);
		for (var i in $scope.counters) {
	        if ($scope.counters[i] == counter) {
	          $scope.counters.splice(i, 1);
	        }
	    }
	};

	$scope.find();

    
}]);