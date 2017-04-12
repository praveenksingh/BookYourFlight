module.exports = function () {
    var mongoose = require('mongoose');

    var commentsSchema = mongoose.Schema({
        airportCode: {type: String, required: true},
        _user :  {type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectUsers'},
        _airport: {type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectAirports'},
        comment : String,
        dateCreated : { type: Date, default: Date.now }
    }, {collection: 'webdev.mongo.project.comments'});
    return commentsSchema;
};