module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var commentsSchema = require('./comments.schema.server')();

    var commentsModel = mongoose.model('Comments', commentsSchema);

    var api = {
    };
    return api;

};