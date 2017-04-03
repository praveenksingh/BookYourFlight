module.exports = function (app) {
    var q = require('q');

    var api = {
        createResponse: createResponse
    };
    return api;

    var airport = [];
    var aircraft =[];
    var carrier =[];
    var city = [];

    function createResponse(data) {
        //TODO add body in the data.body
        airport = data.trips.data.airport;
        aircraft = data.trips.data.aircraft;
        carrier = data.trips.data.carrier;
        city = data.trips.data.city;
        return createResponseDetails(data.trips.tripOption);
    }

    function createResponseDetails(inp){
        var details = [];
        for(var trips in inp) {
            var tripOption = inp[trips];
            var trip = {
                price : tripOption.saleTotal.slice(3,10),
                departureTime : tripOption.slice[0].segment[0].leg[0].departureTime,
                arrivalTime : tripOption.slice[0].segment[tripOption.slice[0].segment.length - 1].leg[0].arrivalTime,
                stops : tripOption.slice[0].segment.length - 1,
                legs : tripOption.slice[0].segment
                    .map(function(element){
                        return {
                            origin: getCityName(element.leg[0].origin),
                            destination: getCityName(element.leg[0].destination),
                            duration: element.duration,
                            carrier: getCarrier(element.flight.carrier),
                            flightCode: element.flight.carrier + " " + element.flight.number,
                            meal: element.leg[0].meal,
                            departureTime: element.leg[0].departureTime,
                            originAirport: getAirportName(element.leg[0].origin),
                            originTerminal: element.leg[0].originTerminal,
                            arrivalTime: element.leg[0].arrivalTime,
                            destinationAirport: getAirportName(element.leg[0].destination),
                            destinationTerminal: element.leg[0].destinationTerminal,
                            aircraft: getAircraft(element.leg[0].aircraft)
                        };
                    })
            };
            details.push(trip);
        }
        return details;
    }

    function getCityName(code) {
        for(var v in city){
            if(city[v].code === code)
                return city[v].name;
        }
    }

    function getCarrier(code) {
        for(var v in carrier){
            if(carrier[v].code === code)
                return carrier[v].name;
        }
    }

    function getAirportName(code) {
        for(var v in airport){
            if(airport[v].code === code)
                return airport[v].name;
        }
    }

    function getAircraft(code) {
        for(var v in aircraft){
            if(aircraft[v].code === code)
                return aircraft[v].name;
        }
    }
};