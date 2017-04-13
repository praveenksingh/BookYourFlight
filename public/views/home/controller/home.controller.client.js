(function () {
    angular
        .module("BookYourTrip")
        .controller("HomeController", homeController);

    function homeController(HomeService, $location, currentUser) {
        var vm = this;
        vm.loading = false;
        vm.flight = {};
        vm.searchFlight = searchFlight;
        vm.currentUser = currentUser;

        function init() {
            vm.flight.depart = new Date();
            // HomeService.setFlightDetails();
        }
        init();

        function searchFlight(flight) {
            vm.loading = true;
            if(flight === undefined) {
                vm.error = "Please fill All Details";
                vm.loading = false;
            }
            else {
                flight.depart = new Date(vm.flight.depart).toISOString();
                var promise = HomeService.findFlightsByDetails(flight);
                promise.success(function (data) {
                    HomeService.setFlightDetails(data);
                    $location.url("/flightDetails")
                    })
                    .error(function (err) {
                        vm.error = "Error finding flights";
                    });
            }
        }
    }
})();