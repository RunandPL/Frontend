'use strict';



runAndApp.controller('AuthCtrl', ['$scope', 'GooglePlus', '$window', '$http', function ($scope, GooglePlus, $window, $http) {
        $scope.login = function () {

            if ($window.sessionStorage.getItem("user") !== null) {
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

                    var $params = {"username": user.email, "isTrainer": true};

                    $http.post('http://api.runand.greeters.pl:3500/login/google', $params)
                            .success(function (data, status, headers, config) {
                                $window.sessionStorage.token = data.token;


                                toastr.success('Witaj, ' + JSON.parse($window.sessionStorage.user).name + '!', 'Sukces!');
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
                                return;
                            });

                });
            }, function (err) {
                toastr.error('Nie udało sie zalogowac.', 'Błąd Google+!');
            });
        };
    }]);

