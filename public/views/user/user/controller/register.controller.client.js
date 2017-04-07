(function () {
    angular
        .module("BookYourTrip")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
            UserService
                .findUserByUserName(user.username)
                .success(function (user) {
                    vm.error = "Sorry username '"+ user.username + "' is already taken"
                })
                .error(function(){
                    UserService
                        .createUser(user)
                        .then(function (user) {
                            $location.url('/profile');
                        }, function (err) {
                            vm.error = 'sorry could not register';
                        });
                });
        }
    }
})();