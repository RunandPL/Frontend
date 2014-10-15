'use strict';
var runAndApp = angular.module('myApp.controllers', []);

/* Controllers */

runAndApp.controller('TagBoardCtrl', ['$scope', function($scope) {
  $scope.header = 'Polecane treningi';
  $scope.workouts= [
        {'name': 'Trening - Park Reagana',
         'description': 'Łatwa trasa na dobrej nawierzchni. Prowadzi głównymi alejami Parku Reagana.  Warto biegac rano i wieczorem, gdy spaceruje mało ludzi.'},
        {'name': 'Oliwa - las',
         'description': 'Znana i uczęszczana trasa typu „tam i z powrotem” prowadząca z Oliwy (okolice klubu studenckiego TROPS przy Akademii Wychowania Fizycznego i Sportu) do leśnej wiaty „Borodziej” (dokładnie do skrzyżowania z tablicą informacyjną). Możliwość zaparkowania samochodu w jednej z bocznych uliczek od ul. Czyżewskiego (ul. Bobrowa, Wiejska). Podany dystans – w jedną stronę.'},
        {'name': 'Grand Prix City Trail',
         'description': 'Zawody odbywają się w 10 lokalizacjach. W Trójmieście zawody będą organizowane już trzeci rok. Poprzednie edycje odbywały się pod nazwą Grand Prix zBiegiemNatury. Pierwszy bieg w Trójmieście już w niedzielę, przy gdańskiej AWFiS. Początek o godz. 11. Zapisy internetowe trwają do czwartku. Koszt startu wynosi 15 zł. W dniu biegu będzie to 20 zł.',
         'distance': 5.2}
      ];
 }]);

  runAndApp.controller('WorkoutCtrl', ['$scope', function($scope) {
     $scope.header = 'Podgląd treningu';     
  }]);


