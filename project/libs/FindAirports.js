var airports = require('./../../airports')
var _ = require('lodash');
var Autocomplete = require('triecomplete');

var airportIataAutocomplete = new Autocomplete();
airportIataAutocomplete.initialize(_.map(airports, function(a) {
    return [a.iata.toLowerCase(), a];
}));

airports = _.indexBy(airports, function(a) {
    return a.iata;
});

module.exports.lookupByIataCode = function(iataCode) {
    return airports[iataCode]
}

module.exports.searchByCityName = function(name) {
    if (_.isEmpty(name)) {
        return [];
    }

    name = name.toLowerCase();

    var iataResults = [];
    var nameResults = [];

    if (name.length <= 3) {
        // searches airport by iata, using name as prefix
        iataResults = _.chain(airportIataAutocomplete.search(name))
            .pluck('value')
            .sortBy('iata')
            .value();
    }

    var iatas = _.pluck(iataResults, 'iata');

    nameResults = _.chain(airports)
        .filter(function(v) {
            return !_.contains(iatas, v.iata) &&  v.city.toLowerCase().indexOf(name) > -1
        })
        .value()

    // have airports with matching iatas be listed before airports with names that
    // have a matching substring
    iataResults = iataResults.concat(nameResults);
    if(iataResults.length > 1){
       var neiataResults = _.chain(iataResults)
            .filter(function(v) {
                return v.name.toLowerCase().indexOf('all airports') > -1
            })
            .value();
       if(neiataResults.length > 0)
           return neiataResults;
       else{
           return _.chain(iataResults)
               .filter(function(v) {
                   return v.name.toLowerCase().indexOf('intl') > -1
               })
               .value();
       }
    }else{
        return iataResults;
    }
};