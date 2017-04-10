(function () {
    angular
        .module("BookYourTrip")
        .controller("TicketDetails", userLoader);

    function userLoader($scope, TicketService) {
        $scope.cancelTicket = cancelTicket;

        function init() {
            TicketService
                .findTicketById($scope.ticket)
                .then(function (ticket) {
                    $scope.ticketDetail = ticket;
                });
        }
        init();

        function cancelTicket(ticket) {
            TicketService
                .cancelTicket(ticket)
                .then(function () {
                    $scope.message = "ticket Cancelled";
                }, function (error) {
                    $scope.error = "Unable to cancel Ticket";
                })
        }
    }
})();