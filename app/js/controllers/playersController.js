'use strict';

/*  Wylistowanie wszystkich zawodników trenera SERWER#96 */

runAndApp.controller('playersListCtrl', function ($scope, $http, $window) {

    $http.get('http://89.79.234.30:3000/api/runners/list')
            .success(function (data, status, headers, config) {
                $scope.error = false;
                $scope.data = data;
            })
            .error(function (data, status, headers, config) {
                $scope.error = true;
                console.log(data);
            });

});