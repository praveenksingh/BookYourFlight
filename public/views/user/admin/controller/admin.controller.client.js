(function(){
    angular
        .module("BookYourTrip")
        .controller("AdminController", adminController);

    function adminController($location, UserService, adminUser, CommentsService, TicketService) {
        var vm = this;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        vm.update = update;
        vm.user = adminUser;
        vm.userProfile = angular.copy(vm.user);
        vm.deleteComment = deleteComment;
        vm.cancelTicket = cancelTicket;
        vm.removeFollowing = removeFollowing;
        vm.removeFollower = removeFollower;

        function init() {
            if(vm.user.image == undefined)
                vm.user.image= "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .then(function () {
                        $location.url("/");
                    }, function (err) {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function update (newUser) {
            UserService
                .updateUser(vm.user._id, newUser)
                .then(function (user) {
                    angular.copy(vm.userProfile, vm.user);
                    vm.message = "user successfully updated";
                }, function (err) {
                    vm.error = "unable to update user";
                });
        }

        function deleteComment(comment) {
            console.log("from profile con");
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

        function removeFollowing(userId) {
            UserService
                .unFollowUserById(userId)
                .then(function (user) {
                    vm.user.following = vm.user.following.filter( function(item) {
                        return !(item == userId);
                    });
                }, function (err) {
                    vm.error = "unable to Remove Following";
                });
        }

        function removeFollower(userId) {
            UserService
                .removeFollowerById(userId)
                .then(function (user) {
                    vm.user.followed = vm.user.followed.filter( function(item) {
                        return !(item == userId);
                    });
                }, function (err) {
                    vm.error = "unable to Remove Follower";
                });
        }

        function cancelTicket(ticket) {
            TicketService
                .cancelTicket(ticket)
                .then(function () {
                    vm.message = "ticket Cancelled";
                }, function (error) {
                    vm.error = "Unable to cancel Ticket";
                })
        }
    }
})();