const router = require("express").Router();
const { signIn, signUp, secret } = require("../controllers/users");
const { schemas, validateBody } = require("../helpers/routeHelpers")

router.post("/signup", validateBody(schemas.authSchema), signUp);
router.post("/signin", signIn);
router.get("/secret", secret);

module.exports = router;