module.exports = function () {
    var mongoose = require('mongoose');

    var airportSchema = mongoose.Schema({
        code: String,
        placeId: String,
        name : String,
        dateCreated : { type: Date, default: Date.now },
        comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentComments'}]
    }, {collection: 'webdev.mongo.project.airports'});
    return airportSchema;
};