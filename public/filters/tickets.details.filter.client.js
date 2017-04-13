(function () {
    angular
        .module("BookYourTrip")
        .controller("TicketDetails", userLoader);

    function userLoader($scope,TicketService) {
        // $scope.cancelTicket = cancelTicket;
        var vm =this;
        vm.render = render;

        function init() {
            TicketService
                .findTicketById($scope.ticket)
                .then(function (ticket) {
                    $scope.ticketDetail = ticket;
                });

            if($scope.$index % 2 === 0)
                $scope.imageSrc = "../../../../../images/flight.jpg";
            else
                $scope.imageSrc = "../../../../../images/flight2.jpg";
        }
        init();



        function render() {
            TicketService
                .findTicketById(vm.ticket)
                .then(function (ticket) {
                    vm.ticketDetail = ticket;
                });

            if(vm.index % 2 === 0)
                vm.imageSrc = "../../../../../images/flight.jpg";
            else
                vm.imageSrc = "../../../../../images/flight2.jpg";
        }

    }
})();