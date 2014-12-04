'use strict';

/* Szczegóły treningu, wysyłanie wiadomoci do zawodnika */

runAndApp.controller('detailsCtrl', function ($scope, $http, $window) {
  
  $scope.username = $scope.$parent.player;
   
  $scope.mail_content;
  
  $scope.send = function ()  {
    var $params = {"username":  $scope.username, "message": $scope.mail_content};
    $http.post('http://api.runand.greeters.pl:3500/api/live/message', $params)
      .success(function (data, status, headers, config) {
        toastr.success(data.msg, $scope.username);
      })
    .error(function (data, status, headers, config) {
      toastr.error(data.msg, 'Błąd!');
      return;
    });
  }

});