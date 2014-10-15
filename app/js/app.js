'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tag_board', {templateUrl: 'partials/tag_board.html', controller: 'TagBoardCtrl'});
  $routeProvider.when('/show_workout', {templateUrl: 'partials/workouts.html', controller: 'WorkoutCtrl'});
  $routeProvider.otherwise({redirectTo: '/tag_board'});
}]);
