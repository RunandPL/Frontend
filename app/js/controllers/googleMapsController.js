'use strict';


/*Google Map Controller - provide dummy Google Map*/
runAndApp.controller('mainCtrl', ['$scope', 'GoogleMapApi'.ns(), '$http', function ($scope, GoogleMapApi, $http) {

        $scope.map = {center: {latitude: 54.41321335332012, longitude: 18.61210285186769}, zoom: 14, bounds: {}};
        $scope.options = {scrollwheel: false};

        $http.get('routes/dummy_route.json').success(function (data) {
            $scope.map.polylines = data;
            console.log(data);
        });

        $scope.map.enable = function () {
            $scope.map.polylines[0].editable = !$scope.map.polylines[0].editable;
        }

        $scope.map.saveRoute = function () {
            alert("Mapa: " + JSON.stringify($scope.map.center));
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


        /*
         * GoogleMapApi is a promise with a
         * then callback of the google.maps object
         *   @pram: maps = google.maps
         */
        GoogleMapApi.then(function (maps) {
            console.log("Załadowano mape.");
        });

    }]);



