module.exports = function () {
    // var airports = require('airport-codes');
    // var airport_codes = require('../../airports.json');
    // var Backbone = require('backbone');
    // var airportsData = new Backbone.Collection(airport_codes.response);

    // airportsData.comparator = 'name';


    // console.log(airportsData.findWhere({name : "Chicago"}));

    var index = require('airportsjs');
    // console.log(index.lookupByIataCode('LAX'));

    console.log(index.searchByAirportName('Los Angeles'));

    var api = {
        validateCity: validateCity,
        getCityIata: getCityIata,
        createRequest: createRequest,
        validateRequestData: validateRequestData,
        validateCities: validateCities
    };
    return api;

    function validateCities(origin, destination) {
        return !(!validateCity(origin) || !validateCity(destination));
    }

    function validateRequestData(details) {
        return !(details.source === undefined
        || details.dest === undefined
        || details.count === undefined
        || details.depart === undefined);
    }

    function validateCity(cityName) {
        // return airports.findWhere({city: cityName}) !== undefined;
        return index.searchByAirportName(cityName).length != 0;
    }

    function getCityIata(cityName) {
        if(validateCity(cityName)){
            return index.searchByAirportName(cityName)[0].iata;
            // return airports.findWhere({city: cityName}).get('iata');
        }
    }

    function createRequest(origin, desitination, count, date) {
        return requestData = {
            request: {
                slice: [
                    {
                        origin: getCityIata(origin),
                        destination: getCityIata(desitination),
                        date: date
                    }
                ],
                passengers: {
                    adultCount: count,
                    infantInLapCount: 0,
                    infantInSeatCount: 0,
                    childCount: 0,
                    seniorCount: 0
                },
                solutions: 2,
                refundable: false
            }
        }
    }




};