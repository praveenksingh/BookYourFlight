(function () {
    angular
        .module("BookYourTrip")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(function (user) {
                    if(user) {
                        console.log(user);
                        if(user.role == 'ADMIN')
                            $location.url('/admin');
                        else
                            $location.url('/profile');
                    }
                }, function (err) {
                    vm.error = err.statusText;
                });
        }
    }
})();