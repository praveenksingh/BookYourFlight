(function(){
    angular
        .module("BookYourTrip")
        .controller("AdminController", adminController);

    function adminController($location, UserService, adminUser, CommentsService, TicketService) {
        var vm = this;
        vm.logout = logout;
        vm.user = adminUser;
        vm.userProfile = angular.copy(vm.user);
        vm.deleteComment = deleteComment;
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

    }
})();