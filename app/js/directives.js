'use strict';

/* Directives */

var myDirectives = angular.module('myApp.directives', []);

  myDirectives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
  
  myDirectives.directive('navbarDirective',function(){
	return{
		templateUrl:'partials/tpl/navbar.tpl.html'
	}
});

  myDirectives.directive('carousellDirective',function(){
	return{
		templateUrl:'partials/tpl/carousell.tpl.html'
	}
});

  myDirectives.directive('loginDirective',function(){
	return{
		templateUrl:'partials/tpl/login.tpl.html'
	}
});

