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
  
  //toastr.options.positionClass = "toast-top-full-width";
  
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
    console.log(data);
  });
  
   $scope.map.enable = function() {
      $scope.map.polylines[0].editable = ! $scope.map.polylines[0].editable;
  }
   
  $scope.map.saveRoute = function() {
    alert("Mapa: " + JSON.stringify($scope.map.center));
  }
     
  $scope.map.showPlayers = function() {
    
     $(this).notifyMe(
        'right', // Position
        'default', // Type
        'Lista trenujących zawodników', // Title
        'W tej chwili nikt nie trenuje...', // Description
        200 // Velocity of notification
    );
    
  }
  
   $scope.map.showConnector = function() {
    
     $(this).notifyMe(
        'right', // Position
        'default', // Type
        'Wybierz zawodnika', // Title
        '<div id="players_list"></div>', // Description
        200, // Velocity of notification,
       function(){alert("zamykam sie");}
    );
  
     
     $( "#players_list" ).append($( "#players_directive" ).show());
     
   
     
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






/*Navbar Controler - provide menu items*/

runAndApp.controller('NavbarCtrl', function ($scope, $http, $window) {
  
  var menu_src;
  if($window.sessionStorage.getItem("user") === null) {
    menu_src = "open.json";
  } else {
    menu_src = JSON.parse($window.sessionStorage.user).role+".json"; 
  }
  
  $http.get('navbar_provider/'+menu_src).success(function(data) {
      $scope.items = data;
    });
   
 
});



runAndApp.controller('takePlayersCtrl', function ($scope, $http, $window) {
 
  $scope.email = "";
  
  $scope.sendInvitation = function() {
    
     toastr.warning('Nie podłączono jeszcze funkcji.', $scope.email);
    
  };
 
});

runAndApp.controller('playersListCtrl', function ($scope, $http, $window) {
  
  $scope.data = [{"name": "Lucjan","email": "example@example"}];
   
 
});