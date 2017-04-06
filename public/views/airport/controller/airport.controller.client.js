(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportController", airportController);

    function airportController($routeParams, AirportService, $q, $http) {
        var vm = this;
        vm.load = true;
        vm.myInterval = 3000;
        var airportCode = $routeParams['airportCode'];

        function init() {
            vm.airportData = [];
            vm.airportPhotos = [];
            var promise = AirportService.findAirportDetailsByCode(airportCode);
                promise.success(function (data) {
                    vm.airportData.push(data);
                    // findPhotosOfAirportClient(data.photos)
                    AirportService.findPhotosOfAirport(data.photos)
                        .success(function (ob) {
                            vm.airportPhotos = ob;
                            vm.load = false;
                        })
                }).error(function (err) {
                    vm.error = "Error loading airport Data"
                });

        }
        init();

        // function findPhotosOfAirportClient(airportData) {
        //     var promises = [];
        //     for(var i in airportData) {
        //         var promise = AirportService.findPhotosOfAirport(airportData[i]);
        //         promises.push(promise);
        //     }
        //     $q.all(promises).then(loadImages(promises));
        // }
        //
        // function loadImages(p) {
        //     for(var i in p){
        //         p[i].success(function (data) {
        //             var image = {
        //                 route : data
        //             };
        //             vm.airportPhotos.push(image);
        //         });
        //     }
        // }
    }
})();