app.controller('CounterController', ['$scope','Counters','counter', function($scope,Counters,counter) {

	$scope.counter = counter;

	$scope.updateCount = function(newCount){
		$scope.counter.count = newCount;
		Counters.updateCount($scope.counter);
	};

  

}]);