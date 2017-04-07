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
        // findUser: findUser,
        findUserByCredentials: findUserByCredentials

    };
    return api;


    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }

    function updateUser(userId, user) {
        return userModel.update(
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
        return userModel.findById(userId);
    }
};