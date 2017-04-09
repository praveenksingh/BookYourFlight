(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportLoader", userLoader);

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