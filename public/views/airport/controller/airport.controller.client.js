(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportController", airportController);

    function airportController($routeParams, AirportService, CommentsService, currentUser) {
        var vm = this;
        vm.load = true;
        vm.currentUser = currentUser;
        vm.myInterval = 3000;
        vm.addComment = addComment;
        var airportCode = $routeParams['airportCode'];

        function init() {
            vm.airportPhotos = [];
            AirportService
                .findAirportDetailsByCode(airportCode)
                .success(renderData)
                .error(function (err) {
                    vm.error = "Error loading airport Data"
                });
        }
        init();

        function renderData(data) {
            vm.airportData = data;
            if(vm.airportData != undefined) {
                renderPhotos(data);
                renderComments(data.place_id);
            }
        }

        function renderComments(placeId) {
            CommentsService.findAllCommentCommentByAirportId(placeId)
                .then(function (comment) {
                    vm.comments = comment;
                }, function (err) {
                    vm.comments = [];
                });
        }

        function renderPhotos(data) {
            AirportService
                .findPhotosOfAirport(data.photos)
                .success(function (ob) {
                    vm.airportPhotos = ob;
                    vm.load = false;
                });
        }

        function addComment(airport) {
            CommentsService.createComment(airport)
                .then(function (com) {
                    console.log(com);
                    vm.comments.push(com);
                }, function (err) {
                    vm.error ="login to continue commenting";
                });
            vm.airportData.comment = "";
        }
    }
})();