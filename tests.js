// var airports = require('airport-codes');
//
// console.log(airports.findWhere({ iata: 'MDW' }).get('name'));
// console.log(airports.findWhere({ iata: 'LAX' }).get('latitude'));
// console.log(airports.findWhere({ iata: 'LAX' }).get('longitude'));
// //=> Los Angeles Intl
//
// console.log(airports.at(124).get('city'));
// console.log(airports.findWhere({ city: 'Chicago' }).get('iata'));
// //=> Sydney
//
// console.log(airports.at(0).get('name'));
// //=> Goroka
// airports.comparator = 'city';
// airports.sort();
// console.log(airports.at(0).get('name'));

// var _ = require('lodash');
var index = require('./project/libs/FindAirports');
console.log(index.lookupByIataCode('LAX'));
console.log(index.searchByCityName('Las Vegas'));


var airlines = require('airline-codes');

console.log(airlines.findWhere({ iata: 'EK' }).get('name'));


// var airport_codes = require('./airports.json');
// var Backbone = require('backbone');
// var airportsData = new Backbone.Collection(airport_codes.response);
//
// airportsData.comparator = 'name'.split(" ")[0].toLowerCase();
// // console.log(airportsData);
//
//
// console.log(airportsData.findWhere({code: "CHI"}).attributes.name.split(" ")[0]);
// console.log(airportsData.findWhere({name: "Chicago"}).attributes.code);