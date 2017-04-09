(function () {
    angular
        .module("BookYourTrip")
        .filter('getUserDetails', function (UserService) {
            return function (arr, user) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].from.username == user)
                        return arr[i].text;
                }
                return '';
            }
        })
})();