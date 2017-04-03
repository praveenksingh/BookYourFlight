(function () {
    angular
        .module("BookYourTrip")
        .controller("FlightDetailsController", flightDetailsController);

    function flightDetailsController(HomeService, $scope, $http) {
        var vm = this;
        $scope.oneAtATime = true;

        function init() {
            vm.flight = HomeService.getFlightDetails();
            vm.details = vm.flight;
            console.log(vm.details);
        }
        init();

        // function formDataForDisply(inp){
        //     vm.details = [];
        //     for(var trips in inp) {
        //         var tripOption = inp[trips];
        //         var trip = {
        //             price : tripOption.saleTotal.slice(3,10),
        //             departureTime : tripOption.slice[0].segment[0].leg[0].departureTime.slice(11, 16),
        //             arrivalTime : tripOption.slice[0].segment[0].leg[tripOption.slice[0].segment[0].leg.length - 1].arrivalTime.slice(11, 16),
        //             stops : tripOption.slice[0].segment.length,
        //             trip : tripOption.slice[0].segment
        //                 .map(function(element){
        //                         var item = {
        //                             origin : " ",
        //                             dest : " ",
        //                             duration : " ",
        //                             carrier : " ",
        //                             flightCode : " ",
        //                             mealOption : " ",
        //                             departureTime : " ",
        //                             arrivalTime : " ",
        //                             originTerminal : " ",
        //                             destinationTerminal : " "
        //                         };
        //                         return item;
        //                     })
        //         };
        //         vm.details.push(trip);
        //     }
        //     console.log(vm.details);
        // }



    }
})();