'use strict';

runAndApp.controller('UserCtrl', function ($scope, $http, $window) {
    $scope.user = {username: 'user1@email.com', password: 'test'};
    $scope.message = '';
    $scope.submit = function () {

        if ($window.sessionStorage.getItem("user") !== null) {
            toastr.warning('Nie możesz zalogowac sie dwukrotnie.', 'Błąd logowania!');
            return;
        }

        $http.post('http://89.79.234.30:3000/login', $scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = JSON.stringify({
                        name: $scope.user.username,
                        email: $scope.user.username,
                        role: "trainer"
                    });

                    toastr.success('Witaj, ' + JSON.parse($window.sessionStorage.user).email + '!', 'Sukces!');
                    setTimeout(function () {
                        $window.location.reload();
                    }, 1000);
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

});