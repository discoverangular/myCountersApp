app.factory('Counters', ['$resource','$q',function($resource,$q){

  var factory ={};

	var counterResource =  $resource('/api/counters/:id',
    {id: '@_id'}
  );

  var countResource =  $resource('/api/counts/:id',
    {id: '@_id'},
    {
      update: {
        method: 'PUT'
      }
    }
  );

 
  factory.find = function() {
    var deferred = $q.defer();
    counterResource.query(function(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

	factory.findOne = function(counterId) {
	  var today = new Date();
	  var dateParam = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	  var deferred = $q.defer();
    counterResource.get({
     id:counterId,
     date: dateParam
    }, function(response) {
  	  deferred.resolve(response);
    });

	  return deferred.promise;
  }


  factory.updateCount = function(counter){
    countResource.update({
      id:counter.countId
    },{
      count:counter.count
    });
  };


  return factory;

}]);