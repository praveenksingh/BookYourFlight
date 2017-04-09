(function () {
    angular
        .module("BookYourTrip")
        .controller("UserLoader", userLoader);

    function userLoader($scope, UserService) {

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