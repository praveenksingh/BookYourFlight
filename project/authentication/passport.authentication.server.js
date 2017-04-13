module.exports = function (userModel) {
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    var bcrypt = require("bcrypt-nodejs");

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : "534459517532-rdcgmlc3abh4923abssbst98khhnq31e.apps.googleusercontent.com",
        clientSecret : "QmKE8merTp9yskEk3pv5eMvb",
        callbackURL  : "http://localhost:3000/google/oauth/callback"
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
                        image: profile.photos[0].value,
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
        userModel
            .findUser(username)
            .then(function(user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
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

    return passport;
};