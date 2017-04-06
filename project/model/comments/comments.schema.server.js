module.exports = function () {
    var mongoose = require('mongoose');

    var commentsSchema = mongoose.Schema({
        _user: String,
        _airport: String,
        comment : String,
        dateCreated : { type: Date, default: Date.now }
    }, {collection: 'webdev.mongo.project.comments'});
    return commentsSchema;
};