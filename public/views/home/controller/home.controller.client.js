(function () {
    angular
        .module("BookYourTrip")
        .controller("HomeController", homeController);

    function homeController(HomeService, $location) {
        var vm = this;
        vm.flight = {};
        vm.searchFlight = searchFlight;
        vm.onSet = onSet;
        
        function onSet() {
            console.log(vm.flight.depart);
        }

        function init() {
            vm.flight.depart = new Date();
            HomeService.setFlightDetails();
        }
        init();

        function searchFlight(flight) {
            if(flight === undefined)
                vm.error = "Please fill All Details";
            else {
                flight.depart = vm.flight.depart.toISOString().slice(0, 10);
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