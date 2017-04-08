module.exports = function () {
    var mongoose = require('mongoose');

    var airportSchema = mongoose.Schema({
        airportCode: String,
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentUsers'}],
        dislikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentUsers'}],
        placeId: String,
        name : String,
        dateCreated : { type: Date, default: Date.now },
        comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentComments'}]
    }, {collection: 'webdev.mongo.project.airports'});
    return airportSchema;
};