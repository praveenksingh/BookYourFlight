(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportController", airportController);

    function airportController($routeParams, AirportService, $q) {
        var vm = this;
        var airportCode = $routeParams['airportCode'];
        
        function init() {
            vm.airportData = [];
            vm.airportPhotos = [];
            var promise = AirportService.findAirportDetailsByCode(airportCode);
                promise.success(function (data) {
                    // console.log(data);
                    vm.airportData.push(data);
                    findPhotosOfAirportClient(data.photos);
                }).error(function (err) {
                    vm.error = "Error loading airport Data"
                });
            console.log(vm.airportPhotos);
        }
        init();

        function findPhotosOfAirportClient(airportData) {
            var promises = [];
            for(var i in airportData) {
                var promise = AirportService.findPhotosOfAirport(airportData[i]);
                promises.push(promise);
            }
            $q.all(promises).then(loadImages(promises));
        }

        function loadImages(p) {
            for(var i in p){
                p[i].success(function (data) {
                    vm.airportPhotos.push(data);
                });
            }
        }
    }
})();