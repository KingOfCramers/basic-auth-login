const router = require("express").Router();
const passport = require("passport");
const { signIn, signUp, secret } = require("../controllers/users");
const { schemas, validateBody } = require("../helpers/routeHelpers")

require("../passport"); /// Must load passport configuration...

/// Passport middleware strategies
const passportLocalMiddleware = passport.authenticate("local", { session: false }); // Used for logging in...
const passportJWTMiddleWare = passport.authenticate('jwt', { session: false }); // Used for getting locked resourcs...

// Simple middleware to validate input from user.
const inputValidator = validateBody(schemas.authSchema);

router.post("/signup", inputValidator, signUp);

router.post("/signin", inputValidator, passportLocalMiddleware, signIn);

router.get("/secret", passportJWTMiddleWare, secret);

module.exports = router;