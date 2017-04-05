(function () {
    angular
        .module("BookYourTrip")
        .factory("AirportService", airportService);

    function airportService($http, $q) {
        var api = {
            "findAirportDetailsByCode": findAirportDetailsByCode,
            "findPhotosOfAirport": findPhotosOfAirport
        };
        return api;

        function findAirportDetailsByCode(airportCode) {
            return $http.get("/api/airport/"+airportCode);
        }

        function findPhotosOfAirport(photos) {
            return $http.post("/api/airportPhotos/",photos);
        }


    }
})();