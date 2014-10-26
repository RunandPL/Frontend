'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'google-maps'.ns()
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/tag_board', {templateUrl: 'partials/tag_board.html', controller: 'TagBoardCtrl'});
  $routeProvider.when('/show_workout', {templateUrl: 'partials/workouts.html', controller: 'WorkoutCtrl'});
  $routeProvider.when('/dummy_map', {templateUrl: 'partials/google_map.html', controller: 'WorkoutCtrl'});
  $routeProvider.otherwise({redirectTo: '/tag_board'});

}]).config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: 'AIzaSyDYF6nmRZqnB_5lx5Ek0zRwITKkYvibZik',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }]);
