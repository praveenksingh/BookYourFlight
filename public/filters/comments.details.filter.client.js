(function () {
    angular
        .module("BookYourTrip")
        .controller("CommentsDetails", userLoader);

    function userLoader($scope, CommentsService, AirportService) {
        // var vm = this;

        function init() {
            // console.log($scope.comment);
            CommentsService
                .findCommentById($scope.comment)
                .then(function (comment) {
                    AirportService.findAirportById(comment._airport)
                        .then(function (airport) {
                            $scope.commentDetails = {
                                commentText : comment.comment,
                                commentDate : comment.dateCreated,
                                airportName : airport.name
                            }
                        });
                });
        }
        init();

    }
})();