const router = require("express").Router();
const passport = require("passport");
const { signIn, signUp, secret } = require("../controllers/users");
const { schemas, validateBody } = require("../helpers/routeHelpers")

require("../passport"); /// Must load passport configuration...

/// Middlewares
const passportLocalMiddleware = passport.authenticate("local", { session: false }); // for logging in...
const passportJWTMiddleWare = passport.authenticate('jwt', { session: false }); // for getting locked resourcs...
const inputValidator = validateBody(schemas.authSchema); // for validating user input...

router.post("/signup", inputValidator, signUp);

router.post("/signin", inputValidator, passportLocalMiddleware, signIn);

router.get("/secret", passportJWTMiddleWare, secret);

module.exports = router;