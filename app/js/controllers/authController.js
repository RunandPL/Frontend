'use strict';

runAndApp.controller('UserCtrl', function ($scope, $http, $window) {
    $scope.if_registration = false;
    $scope.user = {username: 'user1@email.com', password: 'test'};
    $scope.message = '';
    $scope.submit = function () {

        if ($window.sessionStorage.getItem("user") !== null) {
            toastr.warning('Nie możesz zalogowac sie dwukrotnie.', 'Błąd logowania!');
            return;
        }
      
      if($scope.if_registration) {
        
        var $params = {
          username: $scope.user.username,
          password: $scope.user.password,
          isTrainer: true
        };
        
          $http.post('http://api.runand.greeters.pl:3500/register', $params)
                .success(function (data, status, headers, config) {
                  toastr.success(data.msg, 'Sukces!');
                })
                .error(function (data, status, headers, config) { 
                    toastr.error('Nie udało sie zarejestrowac nowego konta.', 'Błąd!');
                  return;
                });
      }    

        $http.post('http://api.runand.greeters.pl:3500/login', $scope.user)
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