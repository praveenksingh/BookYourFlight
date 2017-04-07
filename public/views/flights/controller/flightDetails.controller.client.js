(function () {
    angular
        .module("BookYourTrip")
        .controller("FlightDetailsController", flightDetailsController);

    function flightDetailsController(HomeService, $location, currentUser) {
        var vm = this;
        vm.oneAtATime = true;
        vm.currentUser = currentUser;

        function init() {
            vm.details = HomeService.getFlightDetails();
            console.log(vm.details);
            if(vm.details.length === undefined){
                $location.url("/")
            }
        }
        init();
    }
})();