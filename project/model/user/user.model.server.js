module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server.js')();

    var userModel = mongoose.model('Users', userSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserByGoogleId: findUserByGoogleId,
        createUser: createUser,
        findUserById: findUserById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUser: findUser,
        findUserByCredentials: findUserByCredentials,
        addCommentsToUser: addCommentsToUser,
        findUserByUserId: findUserByUserId,
        deleteCommentFromUser: deleteCommentFromUser,
        addTicketToUser: addTicketToUser,
        addUserTOFollowing: addUserTOFollowing,
        addUserToFollower: addUserToFollower,
        removeUserFromFollower: removeUserFromFollower,
        removeUserFromFollowing: removeUserFromFollowing
    };
    return api;

    function addUserToFollower(userId, followerId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                if(user.followed.indexOf(followerId) == -1) {
                    user.followed.push(followerId);
                    user.save();
                    deferred.resolve(user);
                }else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

    function addUserTOFollowing(userId, followingId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                if(user.following.indexOf(followingId) == -1) {
                    user.following.push(followingId);
                    user.save();
                    deferred.resolve(user);
                }else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

    function addTicketToUser(userId, ticketId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                user.tickets.push(ticketId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }

    function updateUser(userId, user) {
        return userModel.findOneAndUpdate(
            {_id: userId},
            {$set: user}
        );
    }

    function deleteUser(userId) {
        return userModel.remove({_id: userId});
    }

    function findAllUsers() {
        return userModel.find();
    }

    function createUser(user) {
        return userModel.create(user);
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return userModel.findOne({_id: userId});
    }

    function findUserByUserId(userId) {
        return userModel.findOne({_id: userId}, 'firstName lastName image');
    }

    function findUser(username) {
        return userModel.findOne({username: username});
    }

    function addCommentsToUser(userId, commentId){
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                user.comments.push(commentId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function deleteCommentFromUser(userId, commentId){
        var deferred = q.defer();
        userModel
            .findOne({_id: userId}, function (err, user) {
                var index = user.comments.indexOf(commentId);
                user.comments.splice(index, 1);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function removeUserFromFollowing(userId, followingId){
        var deferred = q.defer();
        userModel
            .findOne({_id: userId}, function (err, user) {
                var index = user.following.indexOf(followingId);
                user.following.splice(index, 1);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function removeUserFromFollower(userId, followerId){
        var deferred = q.defer();
        userModel
            .findOne({_id: userId}, function (err, user) {
                var index = user.followed.indexOf(followerId);
                user.followed.splice(index, 1);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }
};