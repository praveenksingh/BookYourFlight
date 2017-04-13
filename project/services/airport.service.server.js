module.exports = function (app, utils, model, passport) {
    app.get("/api/airport/:code", airportDetails);
    app.post("/api/airport/photos", airportPhotos);
    app.post("/api/airport/:code", createAirport);
    app.get("/api/airport/local/:placeId", findAirportByPlaceId);
    app.get("/api/airport/searchById/:airportId", findAirportById);

    var q = require('q');
    var rp = require('request-promise');
    var airportModel = model.airportModel;

    var val = utils.validateUtil;
    // var placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=LAT_LONG&radius=500&keyword=CODE&type=airport&key=API_KEY";
    var placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=LAT_LONG&radius=500&type=airport&key=API_KEY";
    var placesDeatilsAPI = "https://maps.googleapis.com/maps/api/place/details/json?placeid=PLACE_ID&key=API_KEY";
    var placePhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=PIC_WID&photoreference=PHOTO_REF&key=API_KEY";

    placesAPI = placesAPI.replace("API_KEY", key1);
    placesDeatilsAPI = placesDeatilsAPI.replace("API_KEY", key1);
    placePhoto = placePhoto.replace("API_KEY", key1);

    function airportDetails(req, response) {
        var code = req.params['code'];

        //TODO Remove this block after testing
        // var res = require('../../test/testAirport.json');
        // response.status(200).send(res);
        //TODO uncommend down block

        if(!val.validateAirportCode(code))
            response.status(400).send("Not A Valid Airport Code");
        else {
            var options = {
                uri: getPathForAirport(code),
                json: true
            };

            rp(options)
                .then(function (repos) {
                    if(repos.results.length == 0){
                        response.status(404).send('Could not find Airport');
                    }else {
                        var optionsPlaceDetails = {
                            uri: getPathForAirportDetails(repos.results[0].place_id),
                            json: true
                        };
                        rp(optionsPlaceDetails)
                            .then(function (responseDetails) {
                                response.status(200).send(responseDetails.result);
                            })
                            .catch(function (err) {
                                response.status(400).send('Error:', err);
                            });
                    }
                })
                .catch(function (err) {
                    response.status(400).send('Error:', err);
                });
        }
    }

    function getLatLong(code) {
        var de = val.getAirportDetailsByCode(code);
        return de.latitude+','+de.longitude;
    }

    function getPathForAirport(code){
        var path = String(placesAPI);
        var latLong = getLatLong(code);
        path = path.replace("LAT_LONG", latLong);
        // path = path.replace("CODE", code);
        return path;
    }

    function getPathForAirportDetails(placeId){
        var pathDetails = String(placesDeatilsAPI);
        pathDetails = pathDetails.replace("PLACE_ID", placeId);
        return pathDetails;
    }


    function airportPhotos(req, res) {
        var photosList = req.body;
        // var optionsPhoto = {
        //     uri: getPathForImage(photosList.photo_reference, photosList.width)
        // };
        // getPhotosForAirport(optionsPhoto)
        //     .then(function (photos) {
        //         res.status(200).send(photos);
        //
        //     }, function (err) {
        //         res.status(500).send(err);
        //     });

        //TODO Remove this block after testing
        var resu = require('../../test/pics.json');
        res.status(200).send(resu);
        //TODO uncommend down block

        // photosWrapper(photosList)
        //     .then(function (photos) {
        //         res.status(200).send(photos);
        //     }, function (err) {
        //         res.status(500).send(err);
        //     })
    }

    function photosWrapper(list){
        var objList = [];
        var deferred = q.defer();
        for(var i in list){
            var loopStep = i;
            var photosList = list[i];
            var optionsPhoto = {
                uri: getPathForImage(photosList.photo_reference, photosList.width)
            };
            getPhotosForAirport(optionsPhoto)
                .then(function (photos) {
                    objList.push(photos);
                    if(loopStep == objList.length - 1){
                        deferred.resolve(objList);
                    }
                }, function (err) {

                });
        }
        return deferred.promise;
    }
    
    function getPhotosForAirport(optionsPhoto) {
        var deferred = q.defer();
        var request = require('request').defaults({ encoding: null });
        request.get(optionsPhoto.uri, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    }

    function getPathForImage(photoRef, picWidth){
        var pathImage = String(placePhoto);
        pathImage = pathImage.replace("PIC_WID", picWidth);
        pathImage = pathImage.replace("PHOTO_REF", photoRef);
        return pathImage;
    }

    function createAirport(req, res) {
        if(req.user) {
            var airport = {
                placeId : req.body.place_id,
                airportCode : req.params.code,
                name : req.body.name,
            };
            airportModel.createAirport(airport)
                .then(function (airport) {
                    res.json(airport);
                }, function (err) {
                    res.status(500).send();
                });
        }else{
            res.status(400).send();
        }
    }

    function findAirportByPlaceId(req, res) {
        airportModel.findAirportByPlaceId(req.params.placeId)
            .then(function (airport) {
                res.json(airport);
            }, function (err) {
                res.json({});
            })
    }

    function findAirportById(req, res) {
        airportModel.findAirportById(req.params.airportId)
            .then(function (airport) {
                res.json(airport)
            }, function (err) {
                res.json({});
            })
    }

};