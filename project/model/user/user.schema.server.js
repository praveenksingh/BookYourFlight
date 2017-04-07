module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String},
        firstName: String,
        lastName: String,
        email: String,
        role: {type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
        google: {
            id: String,
            token: String
        },
        dateCreated : { type: Date, default: Date.now },
        tickets : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectTickets'}],
        comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectComments'}]
    }, {collection: 'webdev.mongo.project.users'});

    return userSchema;
};