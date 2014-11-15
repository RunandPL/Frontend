'use strict';

/* Services */

var myServices = angular.module('myApp.services', []);

myServices.value('copyrights', 'Marcin Olszewski, Mateusz Pakulski, Paweł Mazurek, Sebastian Miałkowski');

myServices.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
                alert("401");
            }
            return response || $q.when(response);
        }
    };
});