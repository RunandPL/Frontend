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

  myDirectives.directive('trainerDirective',function(){
	return{
		templateUrl:'partials/tpl/trainer_navbar.tpl.html'
	}
});

  myDirectives.directive('playersDirective',function(){
	return{
		templateUrl:'partials/tpl/players_list.tpl.html'
	}
});

  myDirectives.directive('takePlayerDirective',function(){
	return{
		templateUrl:'partials/tpl/take_player.tpl.html'
	}
});

  myDirectives.directive('liveWorkoutsDirective',function(){
	return{
		templateUrl:'partials/tpl/live_workouts_list.tpl.html'
	}
});

  myDirectives.directive('workoutDetailsDirective',function(){
	return{
		templateUrl:'partials/tpl/workout_details.tpl.html'
	}
});
