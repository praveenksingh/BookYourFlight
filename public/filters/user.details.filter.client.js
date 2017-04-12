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
                    if(user.image == undefined)
                        user.image= "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
                    $scope.user = user;
                })
        }
        init();

    }
})();