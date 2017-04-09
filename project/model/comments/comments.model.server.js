module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var commentsSchema = require('./comments.schema.server')();

    var commentsModel = mongoose.model('Comments', commentsSchema);

    var api = {
        findCommentById : findCommentById,
        findCommentsByUser: findCommentsByUser,
        findCommentsByAirport: findCommentsByAirport,
        createComment: createComment,
        deleteComment: deleteComment,
        updateComment :updateComment
    };
    return api;

    function findCommentById(id) {
        return commentsModel.findOne({_id: id});
    }

    function findCommentsByUser(userId) {
        return commentsModel.find({_user: userId});
    }

    function findCommentsByAirport(airportId) {
        return commentsModel.find({_airport: airportId});
    }

    function createComment(comment){
        return commentsModel.create(comment);
    }

    function deleteComment(commentId) {
        return commentsModel.remove({_id: commentId});
    }

    function updateComment(commentId, comment) {
        return commentsModel.update(
            {_id: commentId},
            {$set: comment}
        );
    }


};