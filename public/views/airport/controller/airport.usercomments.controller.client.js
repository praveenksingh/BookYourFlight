(function () {
    angular
        .module("BookYourTrip")
        .controller("AirportCommentsController", airportController);

    function airportController($scope, UserService) {

        function init() {
            UserService
                .findUserByUserId($scope.comments._user)
                .then(function (user) {
                    $scope.user = user;
                })
        }
        init();



    }
})();