(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportController", airportController);

    function airportController($routeParams, AirportService, currentUser) {
        var vm = this;
        vm.load = true;
        vm.currentUser = currentUser;
        vm.myInterval = 3000;
        vm.addComment = addComment;
        var airportCode = $routeParams['airportCode'];

        function init() {
            vm.airportPhotos = [];
            var promise = AirportService.findAirportDetailsByCode(airportCode);
                promise.success(function (data) {
                    vm.airportData = data;
                    AirportService
                        .findPhotosOfAirport(data.photos)
                        .success(function (ob) {
                            vm.airportPhotos = ob;
                            vm.load = false;
                        });
                    AirportService
                        .findAirportByPlaceId(data.place_id)
                        .then(function (airport) {
                            vm.airport = airport;
                        }, function (err) {
                            vm.airport = '0';
                        });

                }).error(function (err) {
                    vm.error = "Error loading airport Data"
                });
        }
        init();

        function addComment(airport) {
            AirportService
                .addCommentToAirport(airport)
                .then(function (data) {
                    console.log(data);
                }, function (err) {
                    vm.error = err.statusText;
                });
        }

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