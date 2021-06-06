require("dotenv").config();
const User = require("../models/user");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
	//console.log("REQ BODY", req.body);
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
			param: errors.array()[0].param,
		});
	}
	//creating a new user on the basis of passed details
	const user = new User(req.body);
	user.save((err, user) => {
		//save user to mongodb
		if (err) {
			return res.status(400).json({
				err: "Not able to save user in DB",
			});
		}
		res.json({
			name: user.name,
			email: user.email,
			id: user._id,
		});
	});
};

exports.signin = (req, res) => {
	const { email, password } = req.body;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User Email does'nt exist",
			});
		}

		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: "Email and Password do not match",
			});
		}
		//create token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		//put token in cookie
		res.cookie("token", token, { expire: new Date() + 9999 });

		//send response to front end
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, name, email, role } });
	});
};

exports.signout = (req, res) => {
	res.clearCookie("token");
	res.json({
		message: "User Signout Successfully",
	});
};

//protected routes
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	userProperty: "auth", //it sends the same id which user is signed in somewhere you see req.auth which actual belongs from here
	algorithms: ["RS256"],
});

//custom middleware
//note: - profile is set from the frontend
// exports.isAuthenticated = (req, res, next) => {
// 	const checker = req.profile && req.auth && req.profile._id == req.auth._id;
// 	if (!checker) {
// 		res.status(403).json({
// 			error: "ACCESS DENIED",
// 		});
// 	}
// 	next();
// };
