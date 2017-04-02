
(function () {
    angular
        .module("BookYourTrip")
        .controller("FlightDetailsController", flightDetailsController);

    function flightDetailsController(HomeService, $location) {
        var vm = this;

        function init() {
            vm.flight = HomeService.getFlightDetails();
        }
        init();


    }
})();