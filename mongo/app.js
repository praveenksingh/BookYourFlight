module.exports = function()
{
    var connectionString = 'mongodb://127.0.0.1:27017/project';

    if(process.env.MONGODB_URI){
        connectionString = process.env.MONGODB_URI
    }

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("BookYourFlight", TestSchema);
};