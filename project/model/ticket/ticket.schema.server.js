module.exports = function () {
    var mongoose = require('mongoose');

    var ticketSchema = mongoose.Schema({
        _user : {type: String, required: true},
        travelDate: {type: Date},
        price: String,
        status: {type: String, enum: ['CONFIRMED', 'CANCELLED'], default: 'CONFIRMED'},
        dateCreated : { type: Date, default: Date.now }
    }, {collection: 'webdev.mongo.project.tickets'});
    return ticketSchema;
};