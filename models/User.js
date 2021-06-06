var mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid'); //to generate unique id's

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		lastname: {
			type: String,
			maxlength: 22,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		encry_password: {
			type: String,
			required: true,
		},
		salt: String,
		contacts: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true } //this gives the time when the new user is created
);

//virtual is used to encrypt password ongoing process. (setter is udes to set the encry password & getter is used to return the encrypted password)
userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password; //it svaes the actual password in variable _password
		this.salt = uuidv1(); //unique id is stored in salt
		this.encry_password = this.securePassword(password);
	})
	.get(function () {
		return this._password;
	});

//this is how we create a methods in mongoose
userSchema.methods = {
	authenticate: function (plainPassword) {
		return this.securePassword(plainPassword) === this.encry_password;
	},

	securePassword: function (plainPassword) {
		if (!plainPassword) return "";
		try {
			return crypto
				.createHmac("sha256", this.salt)
				.update(plainPassword)
				.digest("hex");
		} catch (error) {
			return "";
		}
	},
};

module.exports = mongoose.model("User", userSchema);
