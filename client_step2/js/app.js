var app = angular.module('myCountersApp', ['ngResource','ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'partials/main.html',
                controller: 'MainController'
            })
        .when('/counters/:counterId',
            {
                templateUrl: 'partials/counter.html',
                controller: 'CounterController',
                resolve: {
                    counter: function(Counters,$route) {
                        return Counters.findOne($route.current.params.counterId);
                    }
                }
            })
        .otherwise({ redirectTo: '/' });


        // use the HTML5 History API 
        $locationProvider.html5Mode(true);
});






