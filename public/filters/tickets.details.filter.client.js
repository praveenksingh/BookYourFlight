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
        }
        init();

    }
})();