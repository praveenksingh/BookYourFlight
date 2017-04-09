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
        addCommentsToAirport :addCommentsToAirport,
        deleteCommentFromAirport: deleteCommentFromAirport
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
            .findById(airportId, function (err, airport) {
                airport.comments.push(commentId);
                airport.save();
                deferred.resolve(airport);
            });
        return deferred.promise;
    }

    function deleteCommentFromAirport(airportId, commentId) {
        var deferred = q.defer();
        airportModel
            .findOne({_id: airportId}, function (err, airport) {
                var index = airport.comments.indexOf(commentId);
                airport.comments.splice(index, 1);
                airport.save();
                deferred.resolve(airport);
            });
        return deferred.promise;
    }

};