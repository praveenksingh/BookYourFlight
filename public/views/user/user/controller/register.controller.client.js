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
                        .success(function(user){
                            $location.url('/user/' + user._id);
                        })
                        .error(function () {
                            vm.error = 'sorry could not register';
                        });
                });
        }
    }
})();