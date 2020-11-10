require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require("mongoose");

// connect to db using mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());

// http://<endpoint>/videogames route
const videogamesRouter = require("./routes/videogames");
app.use("/videogames", videogamesRouter); // set route and call route functions

// Set-up the server on port defined in .env
app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));
