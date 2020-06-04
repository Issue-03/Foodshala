const localStrategy = require("passport-local").Strategy;
const User = require("./user");
const Restauarnt = require("./restaurant");

module.exports = function (passport) {
    passport.use('user', new localStrategy({ usernameField: "email" }, (username, password, done) => {

        //Check if User Schema contains
        User.findOne({ email: username }, (err, user) => {
            if (err) { return done(err); }
            if (!err && user) {
                if (!user.validatePassword(password)) {
                    return done(null, false, {
                        message: "Incorrect Password."
                    });
                }
                return done(null, user);
            }
            if (!user) {
                // else check if Restaurant schema contains
                Restauarnt.findOne({ email: username }, (err, user) => {
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, {
                            message: "Incorrect Email."
                        });
                    }
                    if (!user.validatePassword(password)) {
                        return done(null, false, {
                            message: "Incorrect Password."
                        });
                    }
                    return done(null, user);
                });
            }
        });
    })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if (!user) {
                Restauarnt.findById(id, function (err, user) {
                    done(err, user);
                })
            }
            else {
                done(err, user);
            }
        })
    });
}