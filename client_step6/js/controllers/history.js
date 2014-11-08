app.controller('HistoryController', ['$scope','$routeParams','Counters', function($scope,$routeParams,Counters) {

	var currentMonth = new Date();
		
	$scope.getHistory = function(){
		Counters.getHistory($routeParams.counterId,currentMonth).then(function(monthHistory) {
			$scope.monthHistory = monthHistory;
	    });
	};

	$scope.getHistory();

	$scope.nextMonth = function(){
		currentMonth.setMonth(currentMonth.getMonth()+1);
		$scope.getHistory();
	};

	$scope.previousMonth = function(){
		currentMonth.setMonth(currentMonth.getMonth()-1);
		$scope.getHistory();
	};

}]);