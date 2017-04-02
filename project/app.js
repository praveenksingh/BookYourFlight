module.exports = function (app) {
    var validateUtil = require('./libs/requestValidation.utils.server')();

    var utils = {
        validateUtil: validateUtil
    };
    require("./services/home.service.server")(app, utils);
    // require("./services/website.service.server")(app);
    // require("./services/page.service.server")(app);
    // require("./services/widget.service.server")(app);
};