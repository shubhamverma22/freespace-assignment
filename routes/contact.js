const Phonebook = require("../models/Phonebook");
const express = require("express");
const router = express.Router();

const {
	createContact,
	findAllContact,
	updateContact,
	deleteContact,
	findByIdContact,
} = require("../controllers/contact");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");



//Delete Contact
router.delete(
	"/contact/:contactId",
	isSignedIn,
	isAuthenticated,
	deleteContact
);

//Add Contact
router.post("/contact/", createContact);
//view All Contacts
router.get("/user/:userId", isSignedIn, findAllContact);

//Edit Contact
router.put(
	"/user/:userId/:contactId",
	isSignedIn,
	isAuthenticated,
	updateContact
);
//View One Contact
router.get("/contact/:contactId", isSignedIn, findByIdContact);

module.exports = router;
