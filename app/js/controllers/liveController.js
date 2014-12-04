'use strict';

/*Workout Controller - provide workout details*/
runAndApp.controller('WorkoutCtrl', ['$scope','$http', function ($scope,$http) {
  $scope.header = 'Podgląd treningu';
  
  $scope.workouts = [
    {
      "username":"user1@email.com",
      "description":"Trening kondycyjny."
    },
    {
      "username":"user2@email.com",
      "description":"Drugi dzisiejszy trening interwałowy."
    }
  ];
  
  $http.get('http://api.runand.greeters.pl:3500/api/live')
          .success(function (data, status, headers, config) {
            if(data.msg.length > 0) {
              $scope.workouts = data.msg;
            }
            
          })
          .error(function (data, status, headers, config) {
            console.log(data.msg);
          });
 
    }]);