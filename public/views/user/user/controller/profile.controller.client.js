(function(){
    angular
        .module("BookYourTrip")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService, currentUser) {
        var vm = this;
        var userId = $routeParams['userid'];
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        vm.currentUser = currentUser;

        function init() {
            // UserService
            //     .findUserById(userId)
            //     .success(renderUser);
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
            // console.log(answer);
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function renderUser(user) {
            vm.user = user;
            // console.log(user);
        }

        vm.update = function (newUser) {
            // console.log(newUser.emailId);
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        };
    }
})();