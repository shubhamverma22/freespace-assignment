var mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		address: String,
		number: {
			type: Number,
			required: true,
			trim: true,
			maxlength: 12,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Phonebook", contactSchema);
