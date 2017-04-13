(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportDetails", airportLoaded);

    function airportLoaded($scope, AirportService) {
        var vm = this;
        vm.render = render;

        function init() {
            // console.log($scope.comment);
            AirportService
                .findAirportById($scope.comment)
                .then(function (airport) {
                    $scope.airport = airport;
                })
        }
        init();

        function render(){
            AirportService
                .findAirportById(vm.comment)
                .then(function (airport) {
                    vm.airport = airport;
                })
        }

    }
})();