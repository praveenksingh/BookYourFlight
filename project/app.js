module.exports = function (app) {
    var validateUtil = require('./libs/requestValidation.utils.server')();
    var responseCreator = require('./libs/createResponse.utils.server')();
    var utils = {
        validateUtil: validateUtil,
        responseCreator: responseCreator
    };

    var userModel = require('./model/user/user.model.server')();
    var commentsModel = require('./model/comments/comments.model.server')();
    var airportModel = require('./model/airport/airport.model.server')();
    var model = {
        userModel : userModel,
        commentsModel : commentsModel,
        airportModel : airportModel
    };

    require("./services/home.service.server")(app, utils, model);
    require("./services/airport.service.server")(app, utils, model);
    require("./services/user.service.server")(app, utils, model);
};