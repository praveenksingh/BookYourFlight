(function () {
    angular
        .module("BookYourTrip")
        .controller("HomeController", homeController);

    function homeController() {
        var vm = this;

        vm.depart = new Date();
        vm.return = new Date();

        function init() {
            console.log("hi");
        }
        init();
    }
})();