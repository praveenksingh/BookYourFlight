(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportDetails", userLoader);

    function userLoader($scope, AirportService) {

        function init() {
            console.log($scope.comment);
            AirportService
                .findAirportById($scope.comment)
                .then(function (airport) {
                    $scope.airport = airport;
                })
        }
        init();

    }
})();