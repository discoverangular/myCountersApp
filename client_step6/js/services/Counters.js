app.factory('Counters', ['$resource','$q',function($resource,$q){

  var factory ={};

	var counterResource =  $resource('/api/counters/:id',
    {id: '@_id'},
    {
      update: {
        method: 'PUT'
      },
      history: {
        method: 'GET',
        url:'/api/counters/:id/history'
      } 
    }
  );

  var countResource =  $resource('/api/counts/:id',
    {id: '@_id'},
    {
      update: {
        method: 'PUT'
      }
    }
  );

  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
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

  factory.create = function(counterData) {
    var today = new Date();
    var dateParam = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    counterData.date = dateParam;
    var deferred = $q.defer();

    var newCounter = new counterResource(counterData);
    newCounter.$save(function(response) {
      deferred.resolve(response);
    });

    return deferred.promise;
  };


  factory.edit= function(counter){
    var deferred = $q.defer();
    counter.$update(function(response) {
      deferred.resolve(response);
    });

    return deferred.promise;
  };

  factory.remove= function(counter){
    counter.$remove();
  };

  factory.updateCount = function(counter){
    countResource.update({
      id:counter.countId
    },{
      count:counter.count
    },function(response) {
      console.log(response);
    });
  };

  factory.getHistory = function(counterId,month){
    var today = new Date();
    var todayParam = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var monthParam = month.getFullYear()+'-'+(month.getMonth()+1);

    var monthName = monthNames[month.getMonth()]+' '+month.getFullYear() ;
    var deferred = $q.defer();

    counterResource.history({
        id:counterId,
        month: monthParam,    //'2014-08',
        today: todayParam   //'2014-08-20',
      },function(response) {
        response.monthName = monthName;
        deferred.resolve(response);

      });
    return deferred.promise;
  };

  return factory;

}]);