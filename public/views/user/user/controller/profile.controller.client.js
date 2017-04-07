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
                    .success(function () {
                        $location.url("/");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function update (newUser) {
            UserService
                .updateUser(vm.user._id, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        };
    }
})();