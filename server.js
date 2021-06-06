require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
//Routes
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

//db connection
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("DB CONNECTED");
	});

//Middlewares
app.use(express.json());
app.use(cookieparser());
app.use(cors());

//my routes
app.use("/api", authRoutes);
app.use("/api", contactRoutes);

//PORT
const port = process.env.PORT || 8000;

//starting a server
app.listen(port, () => {
	console.log(`App is Running at the PORT ${port}`);
});
