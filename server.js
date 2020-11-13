require("dotenv").config();
// var multer = require('multer');
// var upload = multer();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
// connect to db using mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));
// http://<endpoint>/videogames route
const videogamesRouter = require("./routes/videogames");
const uploadRouter = require("./routes/upload");
app.use("/videogames", videogamesRouter); // set route and call route functions
app.use("/upload", uploadRouter);
// Set-up the server on port defined in .env
app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));
