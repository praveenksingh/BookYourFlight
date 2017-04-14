module.exports = function (app, utils, model, passport) {

    var multer  =   require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var userModel = model.userModel;
    var bcrypt = require("bcrypt-nodejs");

    app.post('/api/login', passport.authenticate('local'), login);
    app.get("/api/user", findUserByUsername);
    app.post('/api/loggedin', loggedin);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post('/api/isAdmin', isAdmin);
    app.get('/api/allUsers', findAllUsers);
    app.delete('/api/user/:userId', deleteUser);
    app.put('/api/user/:userId', updateUser);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user/id/:userId', findUserByUserId);
    app.get('/api/user/follow/:userId', followUserByUserId);
    app.get('/api/user/unFollow/:userId', unFollowUserById);
    app.get('/api/user/removeFollower/:userId', removeFollowerById);
    app.put('/api/updateProfile/:userId', updateProfile);
    app.post ("/api/user/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var myFile      = req.file;
        var userId      = req.body.userId;
        if(myFile === undefined){
            res.redirect("/#/profile/");
        }else {
            var url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
            userModel
                .findUserById(userId)
                .then(function (user) {
                    user.image = url;
                    userModel.addImageToUser(user._id, url)
                        .then(function (user) {
                            res.redirect("/#/profile/");
                        }, function (err) {
                            res.redirect("/#/profile/");
                        });

                }, function (err) {
                    res.redirect("/#/profile/");
                });
        }
    }

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    function unFollowUserById(req, res) {
        if(req.user){
            var reqUser = req.user._id;
            var unFollowUserId = req.params.userId;
            if(reqUser != unFollowUserId){
                userModel
                    .removeUserFromFollowing(reqUser, unFollowUserId)
                    .then(function (user) {
                        userModel
                            .removeUserFromFollower(unFollowUserId, reqUser)
                            .then(function (success) {
                                res.status(200).send(success)
                            }, function (err) {
                                res.status(500).send(err);
                            })
                    }, function (err) {
                        res.status(500).send("Error Occurred");
                    });
            }else
                res.status(500).send("Error Occurred");
        }else
            res.status(401).send();
    }

    function removeFollowerById(req, res) {
        if(req.user){
            var reqUser = req.user._id;
            var removeFollowerById = req.params.userId;
            if(reqUser != removeFollowerById){
                userModel
                    .removeUserFromFollower(reqUser, removeFollowerById)
                    .then(function (user) {
                        userModel
                            .removeUserFromFollowing(removeFollowerById, reqUser)
                            .then(function (success) {
                                res.status(200).send(success)
                            }, function (err) {
                                res.status(500).send(err);
                            })
                    }, function (err) {
                        res.status(500).send("Error Occurred");
                    });
            }else
                res.status(500).send("Error Occurred");
        }else
            res.status(401).send();
    }

    function followUserByUserId(req, res) {
        if(req.user){
            var reqUser = req.user._id;
            var userToFollowId = req.params.userId;
            if(reqUser != userToFollowId){
                userModel
                    .findUserById(userToFollowId)
                    .then(function (user) {
                        userModel
                            .addUserTOFollowing(reqUser, user._id)
                            .then(function (userFollowed) {
                                userModel
                                    .addUserToFollower(user._id, reqUser)
                                    .then(function (follow) {
                                        res.status(200).send(follow);
                                    }, function (err) {
                                        res.status(500).send("Error Following User");
                                    })
                            },function (err) {
                                res.status(500).send("Error Following User");
                            })
                    }, function () {
                        res.status(404).send("Cannot Find User");
                    });
            }else
                res.status(500).send("Cannot Follow Self");
        }else
            res.status(401).send();
    }

    function updateUser(req, res) {
        if(req.user  && (req.user._id == req.body._id) || req.user.role=='ADMIN') {
            var updatedUser = req.body;
            if(updatedUser.password)
                updatedUser.password = bcrypt.hashSync(updatedUser.password);
            userModel
                .updateUser(req.body._id, updatedUser)
                .then(function (user) {
                    res.json(user);
                });
        } else {
            res.status(401).send();
        }
    }

    function updateProfile(req, res) {
        if(req.user && req.user.role=='ADMIN') {
            if (req.params.userId){
                userModel
                    .updateProfile(req.params.userId)
                    .then(function (user) {
                        res.json(user);
                    }, function (err) {
                        res.status(500).send();
                    });
        }else
            res.status(404).send();
        }else
            res.status(401).send();
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function isAdmin(req, res) {
        if(req.isAuthenticated() && req.user.role == 'ADMIN') {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        if(user.image == undefined)
            user.image = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
        userModel
            .createUser(user)
            .then(function (user) {
                if(user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(500).send();
                        }else {
                            res.json(user);
                        }
                    });
                }
            });
    }

    function findAllUsers(req, res) {
        if(req.user && req.user.role=='ADMIN') {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        } else {
            res.json({});
        }
    }

    function deleteUser(req, res) {
        if(req.user && (req.user._doc._id == req.params.userId || req.user.role=='ADMIN')) {
            userModel
                .deleteUser(req.params.userId)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.status(500).send();
                });
        }else{
            res.status(401).send();
        }
    }

    function findUserByUsername(req, res) {
            var username = req.query['username'];
            userModel
                .findUser(username)
                .then(function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.status(404).send('User not found for username: ' + username);
                    }
                }, function (err) {
                    res.sendStatus(500).send(err);
                });

        }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserByUserId(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};