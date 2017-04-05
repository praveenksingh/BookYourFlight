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
// var index = require('./project/libs/FindAirports');
// console.log(index.lookupByIataCode('LAX'));
// console.log(index.searchByCityName('Las Vegas'));
//
//
// var airlines = require('airline-codes');
//
// console.log(airlines.findWhere({ iata: 'EK' }).get('name'));


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

// require('request')(
//     {
//         url: 'http://nodejs.org/logo.png',
//         encoding: 'binary'
//     }
//     , function (e,r,b) {
//         var type    = r.headers["content-type"];
//         var prefix  = "data:" + type + ";base64,";
//         var base64  = new Buffer(b, 'binary').toString('base64');
//         var dataURI = prefix + base64;
//
//         console.log(dataURI);
//     }
// );

// var request = require('request').defaults({ encoding: null });
//
// request.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=CoQBdwAAADVDN3BklcJAX643z1akXuLwx7BFj-upeGDN7kMeHtAavg0oqsSoleAbLXVOFEMnwWfVHlxl6mMCGso2e_wPkmGgyrUsbRTkFzKAuf0pUfDtwUBOQmI4TxBP0N92VILHj3_5qZGtPTXk247uKpMZKlzOam52YqRPIULi5UiwHgJcEhCWzzj5OQ-3zvhg-umXNxC4GhSnYA9EP6uJeYk4EWjQ9OInr1yaIA&key=AIzaSyDKbf5xMjHgx2AxbT8XYiemow5DPfBEj0I', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
//         console.log(data);
//     }
// });

