(function () {
    angular
        .module("BookYourTrip")
        .controller("LoginController", loginController);

    function loginController($location, $scope) {
        var vm = this;

        function init() {
            $scope.myInterval = 3000;
            $scope.slides = [
                {
                    image: 'http://lorempixel.com/400/200/'
                },
                {
                    image: 'http://lorempixel.com/400/200/food'
                },
                {
                    image: 'http://lorempixel.com/400/200/sports'
                },
                {
                    image: 'http://lorempixel.com/400/200/people'
                }
            ];
        }
        init();



    }
})();