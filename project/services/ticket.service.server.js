module.exports = function (app, utils, model, passport) {

    app.get("/api/ticket/:ticketId", findTicketById);
    app.post('/api/ticket', createTicket);
    app.get('/api/ticket', findAllTicketsByUserId);
    app.put('/api/comment/:ticketId', cancelTicket);

    var ticketModel = model.ticketModel;
    var userModel = model.userModel;

    function findTicketById(req, res) {
        if(req.user){
            ticketModel
                .findTicketById(req.params.ticketId)
                .then(function (ticket) {
                    res.json(ticket);
                }, function (err) {
                    res.status(500).send(err);
                });
        }else
            res.status(401).send();
    }

    function createTicket(req, res) {
        if(req.user){
            ticketModel
                .createTicket(req.body)
                .then(function (ticket) {
                    userModel
                        .addTicketToUser(req.user._id, ticket._id)
                        .then(function (userA) {
                            res.json(ticket);
                        }, function (err) {
                            res.status(500).send(err);
                        });
                }, function (err) {
                    res.status(500).send(err);
                });
        }else
            res.status(401).send();
    }

    function findAllTicketsByUserId(req, res) {
        if(req.user){
            ticketModel
                .findAllTicketsByUserId(req.query['userId'])
                .then(function (tickets) {
                    res.json(tickets)
                }, function (err) {
                    res.status(500).send(err);
                });
        }else
            res.status(401).send();
    }

    function cancelTicket(req, res) {
        if(req.user){
            ticketModel
                .cancelTicket(req.params.ticketId)
                .then(function (ticket) {
                    res.json(ticket)
                }, function (err) {
                    res.status(500).send(err);
                });
        }else
            res.status(401).send();
    }

};