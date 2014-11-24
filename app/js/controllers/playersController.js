'use strict';

/*  Wylistowanie wszystkich zawodników trenera SERWER#96 */

runAndApp.controller('playersListCtrl', function ($scope, $http, $window) {

    //$http.get('http://89.79.234.30:3000/api/runners/list')
    $http.get('http://api.runand.greeters.pl:3500/api/runners/list')
            .success(function (data, status, headers, config) {
                
              if(data.msg.length > 0) {
                console.log(data.msg.length);
                 $scope.players = data.msg;
               $scope.error = false;
              } else {
                $scope.error = true;
                
              }
               
            })
            .error(function (data, status, headers, config) {
              $scope.error = true;
                //toastr.error(data.msg);
                console.log(data);
            });

});