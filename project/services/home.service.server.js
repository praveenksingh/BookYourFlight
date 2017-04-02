module.exports = function (app, utils) {
    app.post("/api/flightDetails", flightDetails);

    function flightDetails(req, response) {
        var details = req.body;
        var val = utils.validateUtil;

        if(!val.validateRequestData(details))
            response.status(400).send("Enter All Details");
        else {
            if(!val.validateCities(details.source, details.dest)){
                response.status(400).send("Enter Valid City Names");
            }else {
                if(new Date(details.depart) < new Date())
                    response.status(400).send("Date cannot be past date");
                else {
                    var requestData = val.createRequest(details.source, details.dest, details.count, details.depart);
                    request.post(apiPath,
                        {
                            json: true,
                            body: requestData
                        },
                        function (err, res, body) {
                            response.send(res);
                        });
                }
            }
        }

    }

};