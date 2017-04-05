module.exports = function (app) {
    var validateUtil = require('./libs/requestValidation.utils.server')();
    var responseCreator = require('./libs/createResponse.utils.server')();
    var utils = {
        validateUtil: validateUtil,
        responseCreator: responseCreator
    };
    require("./services/home.service.server")(app, utils);
    require("./services/airport.service.server")(app, utils);
    // require("./services/website.service.server")(app);
    // require("./services/page.service.server")(app);
    // require("./services/widget.service.server")(app);
};