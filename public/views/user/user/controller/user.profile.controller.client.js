(function() {
    angular
        .module("BookYourTrip")
        .controller("UserProfileController", userProfileController);

    function userProfileController($location, $routeParams, UserService, currentUser) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.userId = $routeParams['userId'];
        vm.followUser = followUser;


        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    vm.user = user;
                }, function (error) {
                    $location.url("/404");
                });
            showFollow();
        }
        init();

        function showFollow(){
            vm.follow = vm.currentUser.following.indexOf(vm.userId) == -1;
        }

        function followUser() {
            console.log("solo");
            UserService
                .addUserFollowingList(vm.userId)
                .then(function (user) {
                    vm.message = "Now Following "+user.firstName;
                    vm.follow = false;
                }, function (error) {
                    vm.error = "Error occurred while trying to follow"
                })
        }


    }
})();