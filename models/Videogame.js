const mongoose = require("mongoose");
const videogameSchema = new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
  title: {
  type: String,
  required: true
 },
platform: {
  type: String,
  required: true
 },
releaseDate: {
  type: Date,
  required: true
  },
  image: {
    type: String,
    required: false
  }
});
const Videogame = mongoose.model("Videogame", videogameSchema);
module.exports = Videogame;