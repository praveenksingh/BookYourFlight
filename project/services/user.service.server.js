module.exports = function (app, utils, model) {
    // app.get("/api/user", findUser);
    // app.get("/api/user/:userId", findUserByUserId);
    // app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);
    // app.post("/api/user", createUser);

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    passport.use(new LocalStrategy(localStrategy));

    var userModel = model.userModel;

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/loggedin', loggedin);
    app.post('/api/logout', logout);
    app.post('/api/user', register);
    app.post('/api/isAdmin', isAdmin);
    app.get('/api/user', findAllUsers);
    app.delete('/api/user/:userId', deleteUser);
    app.put('/api/user/:userId', updateUser);
    app.put('/api/profile/:userId', updateProfile);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/user/#!/profile',
            failureRedirect: '/#!/login'
        }));


    var googleConfig = {
        clientID     :  "534459517532-rdcgmlc3abh4923abssbst98khhnq31e.apps.googleusercontent.com",
        clientSecret : "6YiHgFQz4iSYViWeVEeBEvv-",
        callbackURL  :  "http://localhost:3000/user/profile"
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile.id);
        userModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    console.log(111);
                    done(null, user);
                } else {
                    console.log(222);
                    var user = {
                        username: profile.emails[0].value,
                        photo: profile.photos[0].value,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     profile.emails[0].value,
                        google: {
                            id:    profile.id
                        }
                    };
                    return userModel.createUser(user);
                }
            }, function (err) {
                console.log(err);
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                console.log(err);
                done(err, null);
            });
    }

    function localStrategy(username, password, done) {
        console.log(username);
        console.log(password);
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    console.log('[0]');
                    console.log(user);
                    if (!user) {
                        console.log('[1]');
                        return done(null, false);
                    }
                    console.log('[2]');
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function updateUser(req, res) {
        if(req.user && req.user.role=='ADMIN') {
            userModel
                .updateUser(req.body)
                .then(function (status) {
                    res.send(200);
                });
        } else {
            res.json({});
        }
    }

    function updateProfile(req, res) {
        if(req.user && req.user._id == req.body._id) {
            userModel
                .updateProfile(req.body)
                .then(function (status) {
                    res.send(200);
                });
        } else {
            res.json({});
        }
    }

    function login(req, res) {
        console.log('[login]');
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
        userModel
            .createUser(req.body)
            .then(function (user) {
                if(user) {
                    req.login(user, function (err) {
                        res.json(user);
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
        if(req.user && req.user.role=='ADMIN') {
            userModel
                .deleteUser(req.params.userId)
                .then(function (status) {
                    res.send(200);
                });
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    console.log(err);
                    done(err, null);
                }
            );
    }

    // var userModel = model.userModel;
    //
    // function deleteUser(req, res) {
    //     var userId = req.params.userId;
    //     userModel
    //         .deleteUser(userId)
    //         .then(function () {
    //             res.sendStatus(200);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }
    //
    // function createUser(req, res) {
    //     var newUser = req.body;
    //     userModel.createUser(newUser)
    //         .then(function (user) {
    //             res.json(user).send(200);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }
    //
    // function updateUser(req, res) {
    //     var userId = req.params['userId'];
    //     var newUser = req.body;
    //     userModel.updateUser(userId, newUser)
    //         .then(function (user) {
    //             res.sendStatus(200);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }
    //
    // function findUserByUserId(req, res) {
    //     var userId = req.params['userId'];
    //     userModel
    //         .findUserByUserId(userId)
    //         .then(function (user) {
    //             res.send(user);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }
    //
    // function findUser(req, res) {
    //     var username = req.query['username'];
    //     var password = req.query['password'];
    //     if(username && password) {
    //         findUserByCredentials(req, res);
    //     } else if(username) {
    //         findUserByUsername(req, res);
    //     }
    // }
    //
    // function findUserByUsername(req, res) {
    //     var username = req.query['username'];
    //     userModel
    //         .findUser(username)
    //         .then(function (user) {
    //             if(user) {
    //                 res.send(user);
    //             } else {
    //                 res.status(404).send('User not found for username: ' + username);
    //             }
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    //
    // }
    //
    // function findUserByCredentials(req, res){
    //     var username = req.query['username'];
    //     var password = req.query['password'];
    //     userModel
    //         .findUserByCredentials(username, password)
    //         .then(function (user) {
    //             if(user) {
    //                 res.send(user);
    //             } else {
    //                 res.status(404).send('User not found for username: ' + username + ' and password: ' + password);
    //             }
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    //
    // }
};