module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: {type: String, required: true, index: { unique: true }},
        password: {type: String},
        firstName: String,
        lastName: String,
        email: String,
        image: String,
        role: {type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
        google: {
            id: String,
            token: String
        },
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectUsers'}],
        followed: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectUsers'}],
        dateCreated : { type: Date, default: Date.now },
        tickets : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectTickets'}],
        comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoProjectComments'}],
    }, {collection: 'webdev.mongo.project.users'});

    userSchema.pre('remove',  function(next) {
        var comments = this.model('Comments');
        comments.find({_user: this._id})
            .exec(function(err, commentList){
                if(err) {
                    deferred.abort(err);
                } else {
                    for(var w in commentList) {
                        comments.remove({_id: commentList[w]._id}).exec();
                    }
                }
            });
        next();
    });

    return userSchema;
};