module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        phone : String,
        dateCreated : { type: Date, default: Date.now },
        tickets : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectTickets'}],
        comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectComments'}]
    }, {collection: 'webdev.mongo.project.users'});

    return userSchema;
};