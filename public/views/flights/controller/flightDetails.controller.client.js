(function () {
    angular
        .module("BookYourTrip")
        .controller("FlightDetailsController", flightDetailsController);

    function flightDetailsController(HomeService, $location, currentUser, TicketService) {
        var vm = this;
        vm.oneAtATime = true;
        vm.currentUser = currentUser;
        vm.book = book;

        function init() {
            vm.details = HomeService.getFlightDetails();
            console.log(vm.details);
            if(vm.details.length === undefined){
                $location.url("/")
            }
        }
        init();

        function book(trip) {
            TicketService
                .createTicket(trip)
                .then(function (ticket) {
                    vm.message = "Booking confirmed"
                }, function (err) {
                    vm.error = "Error Occured while Booking Flight";
                });
        }
    }
})();