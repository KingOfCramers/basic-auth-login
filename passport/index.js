const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

/// JSON WEB TOKENS STRATEGY
passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Common practice to use authorization...
        secretOrKey: process.env.COOKIE_ENCODE_KEY
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
        try {
            const user = await User.findOne({ "local.email": email });
            if(!user){
                return done(null, false);
            }
            const isMatch = await user.isValidPassword(password); // We created this method in our user schema...

            if(!isMatch){
                return done(null, false);
            }
            done(null, user); // Pass the user back.

        } catch(err) {
            done(err, false);
        }
    })
);

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', // The name of the strategy...
    new GooglePlusTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ "google.id": profile.id });
            if(existingUser){
                console.log('User already exists...')
                return done(null, existingUser);
            };

            console.log('Creating new user...')

            // If new account...
            const newUser = new User({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                }
            });
            await newUser.save();
            done(null, newUser);
        } catch(err) {
            done(err, false);
        };        
    })
);