(function () {
    angular
        .module("BookYourTrip")
        .controller("TicketDetails", userLoader);

    function userLoader($scope, TicketService) {
        // $scope.cancelTicket = cancelTicket;

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

    }
})();