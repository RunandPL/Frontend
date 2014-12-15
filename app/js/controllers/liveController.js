'use strict';

/*Workout Controller - provide workout details*/
runAndApp.controller('WorkoutCtrl', ['$scope','$http', function ($scope,$http) {
  $scope.header = 'Podgląd treningu';
  
  $scope.workouts = [
    {
      "name": "waldemar23",
      "username":"waldemar23@email.com",
      "description":"Trening kondycyjny."
    },
    {
      "name": "easy_run",
      "username":"easy_run@email.com",
      "description":"Drugi dzisiejszy trening interwałowy."
    }
  ];
  
  $http.get('http://api.runand.greeters.pl:3500/api/live')
          .success(function (data, status, headers, config) {
            if(data.msg.length > 0) {
              $scope.workouts = data.msg;
              for(var i =0 ; i< $scope.workouts.length ; i++) {
                var j = $scope.workouts[i].username.indexOf("@");
                $scope.workouts[i].name = $scope.workouts[i].username.substring(0, j);
              }
            }
            
          })
          .error(function (data, status, headers, config) {
            console.log(data.msg);
          });
 

  
    }]);