module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var ticketSchema = require('./ticket.schema.server')();

    var ticketsModel = mongoose.model('Airports', ticketSchema);

    var api = {
        findTicketById: findTicketById,
        createTicket: createTicket,
        cancelTicket: cancelTicket,
        findAllTicketsByUserId: findAllTicketsByUserId
    };
    return api;

    function findAllTicketsByUserId(userId) {
        return ticketsModel.find({_user: userId})
    }

    function findTicketById(ticketId) {
        return ticketsModel.findOne({_id: ticketId})
    }

    function createTicket(ticket) {
        return ticketsModel.create(ticket)
    }

    function cancelTicket(ticketId) {
        return ticketsModel.update(
            {_id: ticketId},
            {$set: {status: 'CANCELLED'}}
        );
    }

};