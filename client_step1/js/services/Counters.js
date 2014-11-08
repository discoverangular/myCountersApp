app.factory('Counters', ['$resource','$q',function($resource,$q){

  var factory ={};

	var counterResource =  $resource('/api/counters/:id',
    {id: '@_id'}
  );
  
  factory.find = function() {
    var deferred = $q.defer();
    counterResource.query(function(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  return factory;
}]);