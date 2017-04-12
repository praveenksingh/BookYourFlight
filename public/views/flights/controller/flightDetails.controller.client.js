(function () {
    angular
        .module("BookYourTrip")
        .controller("FlightDetailsController", flightDetailsController);

    function flightDetailsController(HomeService, $location, currentUser, TicketService) {
        var vm = this;
        vm.oneAtATime = true;
        vm.currentUser = currentUser;
        vm.book = book;
        vm.loading = true;

        function init() {
            // console.log(vm.details);
            //TODO remove the code
            // var promise = HomeService.findFlightsByDetails();
            // promise.success(function (data) {
            //     vm.details = data;
            //     })
            //     .error(function (err) {
            //         vm.error = err;
            //     });
            //TODO Uncomment the below code
            vm.details = HomeService.getFlightDetails();
            if(vm.details.length === undefined)
                $location.url("/")
            else
                vm.loading = false;
        }
        init();

        function book(trip) {
            TicketService.setSelectedTicketDetails(trip);
            $location.url("/flightDetails/passengerInfo")
        }
    }
})();