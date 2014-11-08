app.controller('EditController', ['$scope','$routeParams','$location','Counters','counter', function($scope,$routeParams,$location,Counters,counter) {

	$scope.counter = counter;

	$scope.edit= function() {
		Counters.edit($scope.counter).then(function() {
	        $location.path("/counters/"+$routeParams.counterId);
	    });
	};

}]);