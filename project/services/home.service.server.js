module.exports = function (app, utils) {
    app.post("/api/flightDetails", flightDetails);

    function flightDetails(req, response) {
        var details = req.body;
        var val = utils.validateUtil;

        if(!val.validateRequestData(details))
                response.sendStatus(400);
        else {
            if(!val.validateCities(details.source, details.dest)){
                response.sendStatus(400);
            }else {
                var requestData = val.createRequest(details.source, details.dest, details.count, details.depart);

                request.post(apiPath,
                    {
                        json: true,
                        body: requestData
                    },

                    function (err, res, body) {
                        console.log(res);
                        response.send(res);
                    });
            }
            //response.sendStatus(200);
        }

    }

};