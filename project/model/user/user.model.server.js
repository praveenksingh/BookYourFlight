module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server.js')();

    var userModel = mongoose.model('Users', userSchema);

    var api = {
        createUser: createUser,
        findUserByUserId: findUserByUserId,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUser: findUser,
        findUserByCredentials: findUserByCredentials

    };
    return api;


    function findUser(userName) {
        var deferred = q.defer();
        userModel
            .findOne({username : userName}, function (err, user) {
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findUserByCredentials(userName, password) {
        var deferred = q.defer();
        userModel
            .findOne({$and: [{username : userName}, {password : password}]}, function (err, user) {
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function updateUser(userId, newUser) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.email = newUser.email;
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel
            .findById(userId)
            .exec(function(err, user){
                if(err) {
                    deferred.abort(err);
                } else {
                    user.remove();
                    userModel.remove({_id: userId}, function (err, status) {
                        if(err) {
                            deferred.abort(err);
                        } else {
                            deferred.resolve(status);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function findUserByUserId(userId) {
        var deferred = q.defer();
        userModel
            .findById(userId)
            .exec(function(err, user){
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user._doc);
                }
            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function (err, doc) {
            if(err) {
                deferred.abort();
            } else {
                deferred.resolve(doc._doc);
            }
        });
        return deferred.promise;
    }
};