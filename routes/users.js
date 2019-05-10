const router = require("express").Router();
const passport = require("passport");
const { signIn, signUp, secret } = require("../controllers/users");
const { schemas, validateBody } = require("../helpers/routeHelpers")

require("../passport"); /// Must load passport configuration...

router.post("/signup", validateBody(schemas.authSchema), signUp);
router.post("/signin", validateBody(schemas.authSchema), passport.authenticate("local", { session: false }), signIn);
router.get("/secret", passport.authenticate('jwt', { session: false }), secret);

module.exports = router;