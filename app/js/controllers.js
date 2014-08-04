'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {
   $scope.mssg = 'Witaj w aplikacji dla trenera!';
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {
 $scope.mssg = 'Witaj w aplikacji dla trenera!';
  }]);


