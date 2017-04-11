(function () {
    angular
        .module("BookYourTrip")
        .controller("NotFoundController", notFoundController);

    function notFoundController($location, currentUser, TicketService) {
        var vm = this;
        vm.user = currentUser;
        vm.confirm = confirm;

        function init() {

        }
        init();

        function back() {
           if(vm.user)
               $location.url("/profile")
            else
                $location.url("/login")
        }
    }
})();