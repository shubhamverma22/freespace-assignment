const Phonebook = require("../models/Phonebook");

//Create Contact
exports.createContact = (req, res) => {
	if (!req.body) {
		res.status(400).send({ message: "Contact cannot be Empty" });
		return;
	}
	const contact = new Phonebook({
		name: req.body.name,
		email: req.body.email,
		address: req.body.address,
		number: req.body.number,
	});

	contact
		.save(contact)
		.then((data) => res.send(data))
		.catch((err) => {
			res.status(500).send({
				message: err.message,
			});
		});
};
//get Contact
exports.findAllContact = (req, res) => {
	Phonebook.find()
		.then((user) => {
			res.send(user);
		})
		.catch((err) => {
			return res.status(500).send({ message: err.message });
		});
};

//update Contact
exports.updateContact = (req, res) => {
	if (!req.body) {
		return res
			.status(400)
			.send({ message: "Fields to Update cannot be Empty" });
	}
	const id = req.params.id;
	Phonebook.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({ message: "There is Problem in data" });
			} else {
				res.send(data);
			}
		})
		.catch((err) => {
			res.status(500).send({ message: "Error in Updation" });
		});
};
//delete Contact
exports.deleteContact = (req, res) => {
	const id = req.params.id;
	Phonebook.findByIdAndDelete(id).then((data) => {
		if (!data) {
			res.status(404).send({ message: "There is Problem is Data" });
		} else {
			res.send("Contact Deleted Successfully");
		}
	});
};
//get single Contact
exports.findByIdContact = (req, res) => {
	if (req.query.id) {
		const id = req.query.id;
		Phonebook.findById(id)
			.then((data) => {
				if (!data) {
					res.status(404).send({ message: "Not Found Contact in db" });
				} else {
					res.send(data);
				}
			})
			.catch((err) => {
				res
					.status(500)
					.send({ message: "Error in Retriving the contact from db by ID" });
			});
	}
};
