var airports = require('airport-codes');

console.log(airports.findWhere({ iata: 'LAX' }).get('name'));
console.log(airports.findWhere({ iata: 'LAX' }).get('latitude'));
console.log(airports.findWhere({ iata: 'LAX' }).get('longitude'));
//=> Los Angeles Intl

console.log(airports.at(124).get('city'));
console.log(airports.findWhere({ city: 'Boston' }).get('iata'));
//=> Sydney

console.log(airports.at(0).get('name'));
//=> Goroka
airports.comparator = 'city';
airports.sort();
console.log(airports.at(0).get('name'));

var index = require('airportsjs');
console.log(index.lookupByIataCode('LAX'));

console.log(index.searchByAirportName('JFK'));

var airlines = require('airline-codes');

console.log(airlines.findWhere({ iata: 'EK' }).get('name'));