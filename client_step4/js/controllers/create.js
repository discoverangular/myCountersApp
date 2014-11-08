app.controller('CreateController', ['$scope','$location','Counters', function($scope,$location,Counters) {

	$scope.create= function() {
		Counters.create($scope.counter).then(function(newCounter) {
	        $location.path("/counters/"+newCounter._id);
	    });
	};
    

}]);