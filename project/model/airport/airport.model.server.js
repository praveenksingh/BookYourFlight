module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var airportSchema = require('./airport.schema.server')();

    var airportModel = mongoose.model('Airports', airportSchema);

    var api = {
        findAllComments: findAllComments,
        findAirportByCode: findAirportByCode,
        findAirportByPlaceId: findAirportByPlaceId,
        createAirport: createAirport
    };
    return api;

    function findAllComments(airportId) {

    }

    function findAirportByCode(code) {

    }

    function findAirportByPlaceId() {

    }

    function createAirport(airport){

    }

};