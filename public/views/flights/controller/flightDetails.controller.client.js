(function () {
    angular
        .module("BookYourTrip")
        .controller("FlightDetailsController", flightDetailsController);

    function flightDetailsController(HomeService, $scope, $location) {
        var vm = this;
        $scope.oneAtATime = true;

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