'use strict';
var runAndApp = angular.module('myApp.controllers', []);

/* Controllers */

runAndApp.controller('TagBoardCtrl', ['$scope', function($scope) {
  $scope.header = 'Polecane treningi';
  $scope.workouts= [
        {'name': 'Trening - Park Reagana',
         'description': 'Łatwa trasa na dobrej nawierzchni. Prowadzi głównymi alejami Parku Reagana.  Warto biegac rano i wieczorem, gdy spaceruje mało ludzi.',
         'distance': 3.1,
         'img':'/img/dummy_map.png'
        },
        {'name': 'Oliwa - las',
         'description': 'Znana i uczęszczana trasa typu „tam i z powrotem” prowadząca z Oliwy (okolice klubu studenckiego TROPS przy Akademii Wychowania Fizycznego i Sportu) do leśnej wiaty „Borodziej” (dokładnie do skrzyżowania z tablicą informacyjną). Możliwość zaparkowania samochodu w jednej z bocznych uliczek od ul. Czyżewskiego (ul. Bobrowa, Wiejska). Podany dystans – w jedną stronę.',
         'distance': 9.0,
         'img':'/img/dummy_map.png'},
        {'name': 'Grand Prix City Trail',
         'description': 'Zawody odbywają się w 10 lokalizacjach. W Trójmieście zawody będą organizowane już trzeci rok. Poprzednie edycje odbywały się pod nazwą Grand Prix zBiegiemNatury. Pierwszy bieg w Trójmieście już w niedzielę, przy gdańskiej AWFiS. Początek o godz. 11. Zapisy internetowe trwają do czwartku. Koszt startu wynosi 15 zł. W dniu biegu będzie to 20 zł.',
         'distance': 5.2,
         'img':'/img/dummy_map.png'}
      ];
 }]);

/*Workout Controller - provide workout details*/
runAndApp.controller('WorkoutCtrl', ['$scope', function($scope) {
   $scope.header = 'Podgląd treningu';     
}]);

/*Slider Controler - provide slides content*/
runAndApp.controller('SliderCtrl', function($scope, $http) {
  $http.get('slider/slides.json').success(function(data) {
    $scope.slides = data;
  });
});

/*Google Map Controller - provide dummy Google Map*/
runAndApp.controller('mainCtrl',['$scope','GoogleMapApi'.ns(), '$http', function($scope, GoogleMapApi, $http) {
  
  $scope.map = {center: {latitude:54.41321335332012, longitude:18.61210285186769}, zoom: 14, bounds: {}};
  $scope.options = {scrollwheel: false};

  $http.get('routes/dummy_route.json').success(function(data) {
    $scope.map.polylines = data;
  });
  
   $scope.map.enable = function() {
      $scope.map.polylines[0].editable = ! $scope.map.polylines[0].editable;
  }
   
  $scope.map.saveRoute = function() {
    alert("Mapa: " + JSON.stringify($scope.map.center));
  }
        
        /*
        * GoogleMapApi is a promise with a
        * then callback of the google.maps object
        *   @pram: maps = google.maps
        */
        GoogleMapApi.then(function(maps) {
              console.log("Załadowano mape.");
 
        });
        
    }]);




//runAndApp.controller('AuthCtrl', ['$scope', 'GooglePlus', function ($scope, GooglePlus) {
 //       $scope.login = function () {
       //   GooglePlus.login().then(function (authResult) {
        //      console.log(authResult);
  
         //     GooglePlus.getUser().then(function (user) {
        //          console.log(user);
        //      });
        //  }, function (err) {
         ////     console.log(err);
         // });
   //     };
    //}]);