'use strict';

/* Wysyłanie zapytania przez trenera z prośbą o dodanie zawodnika SERWER#82 */

runAndApp.controller('takePlayersCtrl', function ($scope, $http, $window) {

    $scope.email = "";

    $scope.sendInvitation = function () {

        var $data = '{"runnerUserName": ' + $scope.email + '}';

        $http.post('http://89.79.234.30:3000/api/connect/runner', $data)
                .success(function (data, status, headers, config) {
                    toastr.success('Wysłano zaproszenie. Czekaj, aż zawodnik je potwierdzi.', $scope.email);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    toastr.error('Nie udało sie wybrac zawodnika. Sprobuj ponownie.', $scope.email);
                });
    };

});


