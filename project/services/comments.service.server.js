module.exports = function (app, utils, model, passport) {

    app.get("/api/comment/:commentId", findCommentById);
    app.post('/api/comment', createComment);
    app.get('/api/comment/airport/:airportId', findAllCommentByAirportId);
    app.delete('/api/comment/:commentId', deleteComment);
    app.put('/api/comment/:commentId', updateComment);


    var commentsModel = model.commentsModel;
    var airportModel = model.airportModel;
    var userModel = model.userModel;

    function findCommentById(req, res) {
        if(req.user){
            commentsModel.findCommentById(req.params.commentId)
                .then(function (comment) {
                    res.status(200).json(comment);
                }, function (err) {
                    res.status(500).send();
                })
        }else{
            res.status(401).send();
        }
    }

    function createComment(req, res) {
        if(req.user){
            airportModel.findAirportByPlaceId(req.body.place_id)
                .then(function (airport) {
                    if(airport == undefined){
                        var airport = {
                            placeId : req.body.place_id,
                            airportCode : req.params.code,
                            name : req.body.name
                        };
                        airportModel.createAirport(airport)
                            .then(function (airportCreated) {
                                var comment = {
                                    _user : req.user._id,
                                    _airport : airportCreated._id,
                                    comment : req.body.comment
                                };
                                commentsModel.createComment(comment)
                                    .then(function (commentCrea) {
                                        airportModel.addCommentsToAirport(airportCreated, commentCrea._id)
                                            .then(function () {
                                                userModel.addCommentsToUser(req.user._id, commentCrea._id)
                                                    .then(function (user) {
                                                        res.status(200).send(commentCrea);
                                                    }, function (error) {
                                                        res.status(500).send(error);
                                                    });
                                            }, function (err) {
                                                res.status(500).send(err);
                                            });
                                    }, function (err) {
                                        res.status(500).send(err);
                                    });
                            }, function (err) {
                                res.status(500).send(err);
                            });
                    }else {
                        var comment = {
                            _user : req.user._id,
                            _airport : airport._id,
                            comment : req.body.comment
                        };
                        commentsModel.createComment(comment)
                            .then(function (commentCreated) {
                                airportModel.addCommentsToAirport(airport, commentCreated._id)
                                    .then(function () {
                                        userModel.addCommentsToUser(req.user._id, commentCreated._id)
                                            .then(function (user) {
                                                res.status(200).send(commentCreated);
                                            }, function (error) {
                                                res.status(500).send(error);
                                            });
                                    }, function (err) {
                                        res.status(500).send(err);
                                    });
                            }, function (err) {
                                res.status(500).send(err);
                            });
                    }

                }, function (err) {
                    res.status(500).send(err);
                });
        }else{
            res.status(401).send();
        }
    }

    function findAllCommentByAirportId(req, res) {
        airportModel.findAirportByPlaceId(req.params.airportId)
            .then(function (airport) {
                if(airport != undefined) {
                    commentsModel.findAllCommentsByIdList(airport._doc.comments)
                        .then(function (comments) {
                            res.status(200).send(comments);
                        }, function (err) {
                            res.status(500).send(err);
                        });
                }else{
                    res.json([]);
                }
            },function (err) {
                res.status(500).send(err);
            });
    }

    function deleteComment(req, res) {
        if(req.user){
            commentsModel.findCommentById(req.params.commentId)
                .then(function (comment) {
                    commentsModel.deleteComment(comment._id)
                        .then(function (commentDeleted) {
                            userModel.deleteCommentFromUser(comment._user, comment._id)
                                .then(function () {
                                    airportModel.deleteCommentFromAirport(comment._airport, comment._id)
                                        .then(function () {
                                            res.status(200).send();
                                        }, function (err) {
                                            res.status(500).send(err);
                                        });
                                }, function (err) {
                                    res.status(500).send(err);
                                });
                        }, function (err) {
                            res.status(500).send(err);
                        });
                }, function (err) {
                    res.status(500).send(err);
                });
        }else{
            res.status(401).send();
        }
    }

    function updateComment(req, res) {
        if(req.user){
            commentsModel.updateComment(req.params.commentId, req.body.comment)
                .then(function (comment) {
                    res.status(200).send(comment);
                }, function (err) {
                    res.status(500).send();
                });
        }
    }

};