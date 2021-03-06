module.exports = function () {
    var index = require('./FindAirports');

    var api = {
        validateCity: validateCity,
        getCityIata: getCityIata,
        createRequest: createRequest,
        validateRequestData: validateRequestData,
        validateCities: validateCities,
        validateAirportCode: validateAirportCode,
        getAirportDetailsByCode: getAirportDetailsByCode
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
        return index.searchByCityName(cityName).length != 0;
    }

    function validateAirportCode(code){
        // console.log(index.lookupByIataCode(code));
        return index.lookupByIataCode(code) !== undefined;
    }

    function getAirportDetailsByCode(code) {
        if(validateAirportCode(code)){
            return index.lookupByIataCode(code);
        }
    }

    function getCityIata(cityName) {
        if(validateCity(cityName)){
            return index.searchByCityName(cityName)[0].iata;
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
                solutions: 10,
                refundable: false
            }
        }
    }




};