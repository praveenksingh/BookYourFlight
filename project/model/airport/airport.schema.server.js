module.exports = function () {
    var mongoose = require('mongoose');

    var airportSchema = mongoose.Schema({
        name : String,
        description : String,
        dateCreated : { type: Date, default: Date.now }
    }, {collection: 'webdev.mongo.project.airports'});
    return airportSchema;
};