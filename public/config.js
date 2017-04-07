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
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedInUser
                }
            })
            .when("/flightDetails", {
                templateUrl: "views/flights/templates/flightdetails.view.client.html",
                controller: "FlightDetailsController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedInUser
                }
            })
            .when("/login", {
                templateUrl: "views/user/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/", {
                templateUrl: "views/user/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/airport/:airportCode", {
                templateUrl: "views/airport/templates/airport.view.client.html",
                controller: "AirportController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedInUser
                }
            })
            .otherwise({
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: "HomeController",
                controllerAs: "model"
            });
    }

    function checkLogin($q, UserService, $location) {
        var deferred = $q.defer();
        UserService
            .loggedIn()
            .then(function (user) {
                if(user != '0') {
                    deferred.resolve(user);
                } else {
                    $location.url('/login');
                    deferred.reject();
                }
            });
        return deferred.promise;
    }

    function checkLoggedInUser($q, UserService) {
        var deferred = $q.defer();
        UserService
            .loggedIn()
            .then(function (user) {
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function checkAdmin($q, userService, $location) {
        var defer = $q.defer();
        userService
            .isAdmin()
            .then(function (user) {
                if(user != '0') {
                    defer.resolve(user);
                } else {
                    defer.reject();
                    $location.url('/profile');
                }
            });
        return defer.promise;
    }

})();