(function () {
    angular
        .module("BookYourTrip")
        .factory("CommentsService", commentsService);

    function commentsService($http) {
        var api = {
            "findCommentById": findCommentById,
            "createComment": createComment,
            "findAllCommentCommentByAirportId": findAllCommentCommentByAirportId,
            "deleteComment": deleteComment,
            "updateComment": updateComment
        };
        return api;

        function findCommentById(commentId) {
            return $http.get("/api/comment/"+commentId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createComment(commentDetails) {
            return $http.post("/api/comment/",commentDetails)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCommentCommentByAirportId(airportId) {
            return $http.get("/api/comment/airport/:airportId",airportId)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteComment(commentId) {
            return $http.delete('/api/comment/'+commentId)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateComment(commentId, comment) {
            return $http.put('/api/comment/'+commentId, comment)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();