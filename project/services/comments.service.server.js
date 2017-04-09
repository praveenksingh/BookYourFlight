module.exports = function (app, utils, model, passport) {

    app.get("/api/comment/:commentId", findCommentById);
    app.post('/api/comment', createComment);
    app.get('/api/comment', findAllCommentCommentByAirportId);
    app.delete('/api/comment/:commentId', deleteComment);
    app.put('/api/comment/:commentId', updateComment);


    var commentsModel = model.commentsModel;
    var airportModel = model.commentsModel;

    function findCommentById() {
        if(req.user){
            commentsModel.findCommentById(req.params.commentId)
        }
    }

    function createComment(req, res) {
        if(req.user){
            airportModel.findAirportByPlaceId(req.body.place_id)
                .then(function (airport) {
                    commentsModel.createComment(req.body.comment)
                        .then(function (comment) {
                            res.status(200).send();
                        }, function (err) {
                            res.status(500).send(err);
                        });

                }, function (err) {
                    airportModel.createAirport(req.body)
                        .then(function (airport) {
                            commentsModel.createComment(req.body.comment)
                                .then(function (comment) {
                                    res.status(200).send();
                                }, function (err) {
                                    res.status(500).send(err);
                                });
                        });
                });
        }
    }

    function findAllCommentCommentByAirportId(req, res) {
        if(req.user){
            commentsModel.findCommentsByAirport(req.body.airportId)
                .then(function (comments) {
                    res.status(200).send(comments);
                }, function (err) {
                    res.status(500).send(err);
                })
        }
    }

    function deleteComment() {
        if(req.user){
            commentsModel.deleteComment(req.params.commentId)
                .then(function (success) {
                    res.status(200).send();
                }, function (err) {
                    res.status(500).send();
                })
        }
    }

    function updateComment(req, res) {
        if(req.user){
            commentsModel.updateComment(req.params.commentId,req.body.comment)
                .then(function (success) {
                    res.status(200).send();
                }, function (err) {
                    res.status(500).send();
                });
        }
    }

};