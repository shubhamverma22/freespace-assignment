var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

//signup
router.post(
	"/signup",
	[
		check("name")
			.isLength({ min: 3 })
			.withMessage("Name must be at least 3 chars long"),
		check("email").isEmail().withMessage("Provide an Email"),
		check("password").isLength({ min: 3 }).withMessage("must contain a number"),
	],
	signup
);

//login-in
router.post(
	"/signin",
	[
		check("email").isEmail().withMessage("Provide an Email"),
		check("password").isLength({ min: 3 }).withMessage("Password Is Required"),
	],
	signin
);
//signout
router.get("/signout", signout);

//protected Routres
router.get("/testroute", isSignedIn, (req, res) => {
	res.send("A Protected Route");
});

module.exports = router;
