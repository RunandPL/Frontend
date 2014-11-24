'use strict';
var runAndApp = angular.module('myApp.controllers', []);

/* Controllers */

runAndApp.controller('TagBoardCtrl', ['$scope', '$http', function ($scope, $http) {
  
  $scope.header = 'Polecane treningi';
  
  $http.get('http://api.runand.greeters.pl:3500/route')
  .success(function (data, status, headers, config) {
                    $scope.workouts = data.msg;
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    toastr.error('Nie udało sie pobrac opublikowanych tras');
                  
                    $http.get('workouts_provider/dummy_workouts.json').success(function (data) {
                        $scope.workouts = data;
                    }); 
                
                });
    }]);

/*Workout Controller - provide workout details*/

runAndApp.controller('WorkoutCtrl', ['$scope', function ($scope) {
        $scope.header = 'Podgląd treningu';
    }]);

/*Slider Controler - provide slides content*/
runAndApp.controller('SliderCtrl', function ($scope, $http) {
    $http.get('slider/slides.json').success(function (data) {
        $scope.slides = data;
    });
});

/*Navbar Controler - provide menu items*/

runAndApp.controller('NavbarCtrl', function ($scope, $http, $window) {
  
  $scope.isLogin = false;
  
    var menu_src;
    if ($window.sessionStorage.getItem("user") === null) {
        menu_src = "open.json";
    } else {
        $scope.isLogin = true;
        menu_src = JSON.parse($window.sessionStorage.user).role + ".json";
    }

    /*customowe menu zależne od rodzaju uprawnien*/
    $http.get('navbar_provider/' + menu_src).success(function (data) {
        $scope.items = data;
    });

    $scope.logout = function(){
      
      $window.sessionStorage.clear();
      $scope.isLogin = false;
      toastr.success('Wylogowano poprawnie!');
      setTimeout(function () {
        $window.location.reload();
      }, 1000);
    }  

});



