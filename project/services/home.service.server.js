module.exports = function (app, utils, model, passport) {
    app.post("/api/flightDetails", flightDetails);

    function flightDetails(req, response) {
        var details = req.body;
        var val = utils.validateUtil;
        var responseCreator = utils.responseCreator;

        //TODO Remove this block after testing
        // var res = require('../../test/testResponse.json');
        // var respo = responseCreator.createResponse(res);
        // response.send(respo);
        //TODO uncommend down block

        if(!val.validateRequestData(details))
            response.status(400).send("Enter All Details");
        else {
            if(!val.validateCities(details.source, details.dest)){
                response.status(400).send("Enter Valid City Names");
            }else {
                if(new Date(details.depart).getDate() < new Date().getDate())
                    response.status(400).send("Date cannot be past date");
                else {
                    var requestData = val.createRequest(details.source, details.dest, details.count, '2017-04-15');// details.depart);
                    request.post(apiPath,
                        {
                            json: true,
                            body: requestData
                        },
                        function (err, res, body) {
                        if(err)
                            response.status(500).send(err);
                        else {
                            var respo = responseCreator.createResponse(res);
                            response.json(respo);
                            }
                        });
                }
            }
        }
    }
};