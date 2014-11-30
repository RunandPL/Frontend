'use strict';


/*Google Map Controller - provide dummy Google Map*/
runAndApp.controller('mainCtrl', ['$scope', 'GoogleMapApi'.ns(), '$http', '$window', '$interval', '$routeParams', 
                      function ($scope, GoogleMapApi, $http, $window, $interval, $routeParams) {

         $scope.player = "anonim.";

                        
        $scope.player_mail = "";               
                        
        var stop = $interval(function(){
          
         $http.get('http://api.runand.greeters.pl:3500/api/live')
          .success(function (data, status, headers, config) {
           $window.sessionStorage.live = JSON.stringify(data.msg);
            console.log($window.sessionStorage.live);
          })
          .error(function (data, status, headers, config) {
            console.log(data);
          });
          
        },5000);
                        
        $scope.$on('$destroy', function() {
          $interval.cancel(stop);
        });                
                        
  
        $scope.map = {center: {latitude: 54.41321335332012, longitude: 18.61210285186769}, zoom: 12, bounds: {}};
        $scope.options = {scrollwheel: false};

        $http.get('routes/dummy_route.json').success(function (data) {
            $scope.map.polylines = data;
            console.log(data);
          
          //nadpisanie trasy, gdy trenuje zawodnik
          
          if($routeParams.player !== undefined) {
            
            var xyz = JSON.parse(JSON.parse($window.sessionStorage.live)[0].route);
            
            //$scope.map.polylines[0] = JSON.parse($window.sessionStorage.live)
            
            var new_path = [];
            for (var i = 0; i < xyz.length; i++) { 
                var item = {
                "latitude": xyz[0].x,
                "longitude": xyz[0].y
              }
              new_path[i] = item;
            }
            
            if(new_path.length == 1) {
              
              new_path[1] = new_path[0];
              
            }
            
           // console.log($scope.map.polylines[0].path);
           // console.log(new_path);
            
            $scope.map.polylines[0].path = new_path;
            
            
          }  else {
            
              $interval.cancel(stop);
            
          }
           
          
          
          
          
          
          
        });

        $scope.map.enable = function () {
            $scope.map.polylines[0].editable = !$scope.map.polylines[0].editable;
        }

        $scope.map.saveRoute = function () {
 
          var new_map = {
            "route": JSON.stringify($scope.map.polylines[0].path),
            "description": "Mapa trenera stworzona w aplikacji trenerskiej.",
            "title": "Mapa trenera",
            "isPublic": true,
            "length": "0"
           }; 
          
          $http.post('http://api.runand.greeters.pl:3500/api/route', new_map)
                .success(function (data, status, headers, config) {
                    toastr.success('Zapisano pomyslnie', 'Sukces!');
                })
                .error(function (data, status, headers, config) {
                    toastr.error(data.msg, 'Błąd zapisu!');
                });      
        }

        $scope.map.showAllPlayers = function () {

            $(this).notifyMe(
                    'right',
                    'default',
                    'Lista Twoich zawodników',
                    '<div id="players_panel"></div>',
                    200,
                    function () {

                        $("#dummy_map_container").append($("#players_directive").hide());
                        $('#list_players_button').prop('disabled', false);
                    }
            );
            $("#players_panel").append($("#players_directive").show());
            $('#list_players_button').prop('disabled', true);
        }

        /*Szczegóły treningu*/
        $scope.map.showWorkoutDetails = function () {

            $(this).notifyMe(
                    'right',
                    'default',
                    'Szczegóły treningu',
                    '<div id="details_panel"></div>',
                    200,
                    function () {

                        $("#dummy_map_container").append($("#details_directive").hide());
                        $('#show_details_button').prop('disabled', false);
                    }
            );
            $("#details_panel").append($("#details_directive").show());
            $('#show_details_button').prop('disabled', true);
        }

        /*Aktywne treningi*/
        $scope.map.showWorkouts = function () {

            $(this).notifyMe(
                    'right',
                    'default',
                    'Lista aktywnych treningów',
                    '<div id="workouts_panel"></div>',
                    200,
                    function () {

                        $("#dummy_map_container").append($("#workouts_directive").hide());
                        $('#workouts_button').prop('disabled', false);
                    }
            );
            $("#workouts_panel").append($("#workouts_directive").show());
            $('#workouts_button').prop('disabled', true);
        }

        /*Panel połączenia trenera i zawodnika*/
        $scope.map.showConnector = function () {
            $(this).notifyMe(
                    'right',
                    'default',
                    'Wybierz zawodnika',
                    '<div id="check_player_panel"></div>',
                    200, // Velocity of notification,
                    function () {

                        $("#dummy_map_container").append($("#take_player_directive").hide());
                        $('#check_player_button').prop('disabled', false);
                    }
            );

            $("#check_player_panel").append($("#take_player_directive").show());
            $('#check_player_button').prop('disabled', true);
        }

        $scope.create_notifyme = function ($title, $directive_name, $button_id, $destination_div, $source_div) {
            $(this).notifyMe(
                    'right',
                    'default',
                    $title,
                    '<div id="'+$destination_div+'"></div>',
                    200, // Velocity of notification
                    function () {
                        $("#dummy_map_container").append($("#"+$source_div).hide());
                        $('#'+$button_id).prop('disabled', false);
                    }
            );
            $("#"+$destination_div).append($("#"+$source_div).show());
            $('#'+$button_id).prop('disabled', true);
        }

        /*
         * GoogleMapApi is a promise with a
         * then callback of the google.maps object
         *   @pram: maps = google.maps
         */
        GoogleMapApi.then(function (maps) {
            console.log("Załadowano mape.");
        });

    }]);



