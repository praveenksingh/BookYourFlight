(function(){
    angular
        .module("BookYourTrip")
        .config(configuration);

    function configuration($routeProvider, $locationProvider, $httpProvider) {
        // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            });
    }
})();