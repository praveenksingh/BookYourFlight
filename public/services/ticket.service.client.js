(function () {
    angular
        .module("BookYourTrip")
        .factory("TicketService", commentsService);

    function commentsService($http) {
        var api = {
            "findTicketById": findTicketById,
            "createTicket": createTicket,
            "findAllTicketsByUserId": findAllTicketsByUserId,
            "cancelTicket": cancelTicket
        };
        return api;

        function findTicketById(ticketId) {
            return $http.get("/api/ticket/"+ticketId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createTicket(ticket) {
            return $http.post("/api/ticket",ticket)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllTicketsByUserId(userId) {
            return $http.get("/api/ticket?userId="+userId)
                .then(function (response) {
                    return response.data;
                });
        }

        function cancelTicket(ticketId) {
            return $http.put('/api/ticket/'+ticketId)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();