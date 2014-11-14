'use strict';

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