const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Common practice to use authorization...
        secretOrKey: process.env.COOKIE_ENCODE
    }, async(payload, done) => {
        try {
            // Find the user specified in token, and return them
            const user = await User.findById(payload.sub); // This is in our token!
            if(!user){
                return done(null, false);
            };
            done(null, user);

        } catch(err){
            done(err, false)
        }
    })
);