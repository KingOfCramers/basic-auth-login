const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/User");


/// JSON WEB TOKENS STRATEGY
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

// LOCAL STRATEGY
passport.use(
    new LocalStrategy({
        usernameField: 'email', // This defaults to username otherwise, we need to manually set it.
    }, async (email, password, done) => {

        const user = await User.findOne({ email });
        // If user doesn't exist, handle this...
        if(!user){
            return done(null, false);
        }
        // Then check that the password is correct...

        // If not, handle that...

        // Return the user...
    })
)