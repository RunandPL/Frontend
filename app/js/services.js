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

myServices.factory('myRoute', function () {
    
   var _route = undefined,
        
       _parse = function(points) {
         
            for(var i=0;i<points.length;i++) {
             var point = points[i];
             if (point.hasOwnProperty("latitude") && point.hasOwnProperty("longitude")) {
               point["x"] = point["latitude"];
               point["y"] = point["longitude"];
               point["z"] = 0;
               delete point["latitude"];
               delete point["longitude"];
             }
           }
         console.log(points);
         return points;
       },
       
        _setRoute = function (route) {
          
           var myRoute = JSON.parse(route.route);
          
           for(var i=0;i<myRoute.length;i++) {
             var point = myRoute[i];
             if (point.hasOwnProperty("x")) {
               point["latitude"] = point["x"];
               point["longitude"] = point["y"];
               delete point["x"];
               delete point["y"];
               delete point["z"];
             }
           }
          
            _route = myRoute;
        },
        
        _getRoute = function () {
            return _route;
        },
  
        _getPath = function () {
            return _route;
        };
    
    return {
        parsePoints: _parse,
        setRouteObject: _setRoute,
        getRoute: _getRoute,
        getPath: _getPath,
        clear: function () {
          _route = undefined;
        },
        isEmpty: function() {
          if(_route === undefined) 
            return true;
          else
            return false;
        } 
    };
    
});