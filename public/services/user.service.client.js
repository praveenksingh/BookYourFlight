(function () {
    angular
        .module("BookYourTrip")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "updateUser": updateUser,
            "findUserByUserName": findUserByUserName,
            "deleteUser" : deleteUser
        };
        return api;

        function findUserByUserName(username) {
            return $http.get("/api/user?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

    }
})();