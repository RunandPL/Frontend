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




runAndApp.controller('AuthCtrl', ['$scope', 'GooglePlus', '$window', '$http', function ($scope, GooglePlus, $window, $http) {
       $scope.login = function () {
         
           if($window.sessionStorage.getItem("user") !== null) {
              toastr.warning('Nie możesz zalogowac sie dwukrotnie.', 'Błąd logowania!');
               return;
          }
         
        GooglePlus.login().then(function (authResult) {
            //console.log(authResult);
            GooglePlus.getUser().then(function (user) {
                 //console.log(user);
              $window.sessionStorage.token = "dummy.token";
              $window.sessionStorage.user = JSON.stringify({
                name: user.name,
                email: user.email,
                role: "trainer"
              });
        
              var $params = {"username": user.email,"isTrainer": true};
              
      $http.post('http://89.79.234.30:3000/login/google', $params)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;  
        
        
         toastr.success('Witaj, '+ JSON.parse($window.sessionStorage.user).name+'!', 'Sukces!');
      setTimeout(function(){ $window.location.reload();},1000);
        
        
        
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;

        // Handle login errors here
        toastr.error('Nie udało sie zalogowac.', 'Błąd logowania!');
        return;
      }); 
             
             });
        }, function (err) {
            toastr.error('Nie udało sie zalogowac.', 'Błąd Google+!');
          });
     };
    }]);



runAndApp.controller('UserCtrl', function ($scope, $http, $window) {
  $scope.user = {username: 'user1@email.com', password: 'test'};
  $scope.message = '';
  $scope.submit = function () {
    
    if($window.sessionStorage.getItem("user") !== null) {
              toastr.warning('Nie możesz zalogowac sie dwukrotnie.', 'Błąd logowania!');
               return;
     }
    
    $http.post('http://89.79.234.30:3000/login', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.user = JSON.stringify({
          uid: 0,
          name: "dummy_user_name",
          mail: "dummy@mail.address",
          role: "trainer"
          });
      
         toastr.success('Witaj, '+ JSON.parse($window.sessionStorage.user).name+'!', 'Sukces!');
          setTimeout(function(){ $window.location.reload();},1000);    
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;

        // Handle login errors here
        toastr.error('Nie udało sie zalogowac.', 'Błąd logowania!');
      });  
  };

  $scope.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.user;
  }
  
  
  
  
  $scope.test1 = function () {
    $http({url: 'http://89.79.234.30:3000/api/connect', method: 'GET'})
    .success(function (data, status, headers, config) {
      //console.log(data);
    });
  };
  
    $scope.test2 = function () {
    $http({url: 'http://89.79.234.30:3000/api/workout', method: 'GET'})
    .success(function (data, status, headers, config) {
      //console.log(data);
    });
  };
  
  /*{
    route: <<value>>, // string zlozony z doubli poprzedzielanych '?'.
    lengthTime: <<value>>,
    burnedCalories: <<value>>,
    speedRate: <<value>>
}*/
    $scope.test3 = function () {
    $http({url: 'http://89.79.234.30:3000/api/workout', method: 'POST'})
    .success(function (data, status, headers, config) {
      //console.log(data);
    });
  };
  
});


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