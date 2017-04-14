(function() {
    angular
        .module("BookYourTrip")
        .controller("ModifyProfileController", modifyProfileController);

    function modifyProfileController($location, $routeParams, UserService, adminUser, CommentsService) {
        var vm = this;
        vm.currentUser = adminUser;
        vm.userId = $routeParams['userId'];
        vm.deleteComment = deleteComment;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    if(user.image == undefined)
                        user.image= "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
                    vm.user = user;
                }, function (error) {
                    $location.url("/404");
                });
        }
        init();

        function deleteComment(comment) {
            CommentsService
                .deleteComment(comment)
                .then(function (success) {
                    vm.user.comments = vm.user.comments.filter( function(item) {
                        return !(item == comment);
                    });
                }, function (err) {
                    vm.error = "unable to Delete comment";
                });

        }

    }
})();