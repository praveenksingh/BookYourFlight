(function () {
    angular
        .module("BookYourTrip")
        .factory("AirportService", airportService);

    function airportService($http) {
        var api = {
            "findAirportDetailsByCode": findAirportDetailsByCode,
            "findPhotosOfAirport": findPhotosOfAirport,
            "addCommentToAirport": addCommentToAirport,
            "findAirportByPlaceId": findAirportByPlaceId
        };
        return api;

        function findAirportDetailsByCode(airportCode) {
            return $http.get("/api/airport/"+airportCode);
        }

        function findPhotosOfAirport(photos) {
            return $http.post("/api/airport/photos/",photos);
        }

        function addCommentToAirport(airportData) {
            return $http.post("/api/airport/",airportData)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAirportByPlaceId(placeId) {
            return $http.get('/api/airport/local/'+placeId)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();