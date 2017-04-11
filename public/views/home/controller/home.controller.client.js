(function () {
    angular
        .module("BookYourTrip")
        .controller("HomeController", homeController);

    function homeController(HomeService, $location, currentUser) {
        var vm = this;
        vm.flight = {};
        vm.searchFlight = searchFlight;
        vm.currentUser = currentUser;

        function init() {
            vm.load = false;
            vm.flight.depart = new Date();
            HomeService.setFlightDetails();
        }
        init();

        function searchFlight(flight) {
            if(flight === undefined)
                vm.error = "Please fill All Details";
            else {
                vm.load = true;
                flight.depart = vm.flight.depart;
                var promise = HomeService.findFlightsByDetails(flight);
                promise.success(function (data) {
                    HomeService.setFlightDetails(data);
                    $location.url("/flightDetails")
                    })
                    .error(function (err) {
                        vm.error = err;
                    });
            }
        }
    }
})();