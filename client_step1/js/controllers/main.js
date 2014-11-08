app.controller('MainController', ['$scope','Counters', function($scope,Counters) {

	$scope.find = function() {
		Counters.find().then(function(counters) {
            $scope.counters = counters;
        });
	};

	$scope.find();
   
}]);