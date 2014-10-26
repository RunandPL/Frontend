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
runAndApp.controller('mainCtrl',['$scope','GoogleMapApi'.ns(), function($scope, GoogleMapApi) {
  
        $scope.map = {center: {latitude: 54.3600, longitude: 18.639 }, zoom: 12, bounds: {}};
        $scope.options = {scrollwheel: false};
        var createRandomMarker = function (i, bounds, idKey) {
            var lat_min = bounds.southwest.latitude,
                lat_range = bounds.northeast.latitude - lat_min,
                lng_min = bounds.southwest.longitude,
                lng_range = bounds.northeast.longitude - lng_min;

            if (idKey == null) {
                idKey = "id";
            }

            var latitude = lat_min + (Math.random() * lat_range);
            var longitude = lng_min + (Math.random() * lng_range);
            var ret = {
                latitude: latitude,
                longitude: longitude,
                title: 'm' + i
            };
            ret[idKey] = i;
            return ret;
        };
        $scope.randomMarkers = [];
        // Get the bounds from the map once it's loaded
        $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
            // Only need to regenerate once
            if (!ov.southwest && nv.southwest) {
                var markers = [];
                for (var i = 0; i < 50; i++) {
                    markers.push(createRandomMarker(i, $scope.map.bounds))
                }
                $scope.randomMarkers = markers;
            }
        }, true);
        
        /*
        * GoogleMapApi is a promise with a
        * then callback of the google.maps object
        *   @pram: maps = google.maps
        */
        GoogleMapApi.then(function(maps) {
              console.log("Załadowano mape.");
        });
        
    }]);
