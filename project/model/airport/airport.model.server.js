module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var airportSchema = require('./airport.schema.server')();

    var airportModel = mongoose.model('Airports', airportSchema);

    var api = {
        findAirportByCode: findAirportByCode,
        findAirportByPlaceId: findAirportByPlaceId,
        createAirport: createAirport,
        findAirportById: findAirportById,
        addCommentsToAirport :addCommentsToAirport
    };
    return api;

    function findAirportByCode(code) {
        return airportModel.findOne({airportCode: code});
    }

    function findAirportByPlaceId(placeId) {
        return airportModel.findOne({placeId: placeId});
    }

    function createAirport(airport){
        return airportModel.create(airport);
    }

    function findAirportById(airportId) {
        return airportModel.findById(airportId);
    }

    function addCommentsToAirport(airportId, commentId) {
        var deferred = q.defer();
        airportModel
            .findById(airportId, function (err, user) {
                user.comments.push(commentId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

};