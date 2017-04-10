(function () {
    angular
        .module("BookYourTrip")
        .controller("UserDetails", userLoader);

    function userLoader($scope, UserService) {
        var userId = "";
        function init() {
            if($scope.comments)
                userId = $scope.comments._user
            else
                if($scope.following)
                    userId = $scope.following;

            UserService
                .findUserByUserId(userId)
                .then(function (user) {
                    $scope.user = user;
                })
        }
        init();

    }
})();