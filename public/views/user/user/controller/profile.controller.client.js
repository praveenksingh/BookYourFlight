(function(){
    angular
        .module("BookYourTrip")
        .controller("ProfileController", profileController);

    function profileController($location, UserService, currentUser) {
        var vm = this;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        vm.update = update;
        vm.user = currentUser;

        function init() {

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
                .then(function () {
                    vm.message = "user successfully updated";
                }, function (err) {
                    vm.error = "unable to update user";
                });
        }
    }
})();