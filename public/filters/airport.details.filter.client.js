(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportDetails", airportLoaded);

    function airportLoaded($scope, AirportService) {

        function init() {
            // AirportService
            //     .findAirportById($scope.comment)
            //     .then(function (airport) {
            //         $scope.airport = airport;
            //     })
        }
        init();

    }
})();