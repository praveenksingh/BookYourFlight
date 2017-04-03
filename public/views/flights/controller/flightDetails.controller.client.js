(function () {
    angular
        .module("BookYourTrip")
        .controller("FlightDetailsController", flightDetailsController);

    function flightDetailsController(HomeService, $scope, $http) {
        var vm = this;
        $scope.oneAtATime = true;

        function init() {
            vm.flight = HomeService.getFlightDetails();
            $http.get('test/testResponse.json').success(function(data) {
                vm.flight = data;
                console.log(vm.flight);
            });
        }
        init();

        function formDataForDisply(){
            vm.details = {};

        }

    }
})();