'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'google-maps'.ns(),
  'googleplus'
  
]);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/tag_board', {templateUrl: 'partials/tag_board.html', controller: 'TagBoardCtrl'});
  $routeProvider.when('/show_workout', {templateUrl: 'partials/workouts.html', controller: 'WorkoutCtrl'});
  $routeProvider.when('/dummy_map', {templateUrl: 'partials/google_map.html', controller: 'WorkoutCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'AuthCtrl'});
  $routeProvider.otherwise({redirectTo: '/tag_board'});

}]);

myApp.config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: 'AIzaSyDYF6nmRZqnB_5lx5Ek0zRwITKkYvibZik',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }]);

myApp.config(['GooglePlusProvider', function(GooglePlusProvider) {
         GooglePlusProvider.init({
           clientId: '551917479486-m0b7nr22i2rpigdsrdsrrmabvesh3fac.apps.googleusercontent.com',
           apiKey: 'AIzaSyDYZUmgWM0OxaUF570G57rdVh8LYxiPTPw'
         });
    }]);

myApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With']; 
  //$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
}]);

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});


