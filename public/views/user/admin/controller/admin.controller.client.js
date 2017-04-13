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
        // vm.cancelTicket = cancelTicket;
        // vm.removeFollowing = removeFollowing;
        // vm.removeFollower = removeFollower;
        vm.loadAllUsers = loadAllUsers;
        vm.loadAllComments = loadAllComments;

        function init() {
            if(vm.user.image == undefined)
                vm.user.image= "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
            loadAllUsers();
            loadAllComments();
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function loadAllUsers(){
            UserService
                .findAllUsers()
                .then(function (users) {
                    vm.allUsers = users.filter( function(item) {
                        return !(item._id == vm.user._id);
                    });
                }, function (err) {
                    vm.error = "error in loading All Users"
                });
        }

        function loadAllComments() {
            CommentsService
                .findAllComments()
                .then(function (allCommets) {
                    vm.allComments = allCommets;
                }, function (err) {
                    vm.error = "Error loading the commnets";
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
            CommentsService
                .deleteComment(comment._id)
                .then(function (success) {
                    vm.allComments = vm.allComments.filter( function(item) {
                        return !(item._id == comment._id);
                    });
                }, function (err) {
                    vm.error = "unable to Delete comment";
                });

        }

        // function removeFollowing(userId) {
        //     UserService
        //         .unFollowUserById(userId)
        //         .then(function (user) {
        //             vm.user.following = vm.user.following.filter( function(item) {
        //                 return !(item == userId);
        //             });
        //         }, function (err) {
        //             vm.error = "unable to Remove Following";
        //         });
        // }
        //
        // function removeFollower(userId) {
        //     UserService
        //         .removeFollowerById(userId)
        //         .then(function (user) {
        //             vm.user.followed = vm.user.followed.filter( function(item) {
        //                 return !(item == userId);
        //             });
        //         }, function (err) {
        //             vm.error = "unable to Remove Follower";
        //         });
        // }
        //
        // function cancelTicket(ticket) {
        //     TicketService
        //         .cancelTicket(ticket)
        //         .then(function () {
        //             vm.message = "ticket Cancelled";
        //         }, function (error) {
        //             vm.error = "Unable to cancel Ticket";
        //         })
        // }
    }
})();