const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Videogame = require("../models/Videogame");

// Get All Route
router.get("/", async (req, res) => {
    Videogame.find()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("Request Failed"));
});

// Get One Route
router.get("/:id", async (req, res) => {
    Videogame.findById(req.params.id)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json({
            message: "request failed 400 error",
            error: err
        }));
  });

// Create One Route
router.post("/", (req, res, next) => {
    console.log(req.body);
    const videogame = new Videogame({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        platform: req.body.platform,
        releaseDate: req.body.releaseDate,
        image: req.body.image
    });
    videogame
      .save()
        .then((resp) => res.status(201).json({
            message: "Handled POST requests to /videogames",
            createdProduct: videogame
        }))
      .catch((err) => res.status(400).json("Request Failed"));
});
// Edit One Route PUT version
router.put("/:id", getUser, async (req, res) => {
    let updates = req.body //we set a variable equal to the entire req.body
    Videogame.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
        .then(updatedgame => res.json(updatedgame))
        .catch(err => res.status(400).json("Error: " + err))
});

// Edit One Route PATCH version
router.patch("/:id", async (req, res) => {
    Videogame.updateOne({ _id: req.params.id }, { $set: req.body })
    // updates all data in db that matches incoming body
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request Failed"));
});
// Delete One Route
router.delete("/:id", async (req, res) => {
    Videogame.remove({ _id: req.params.id })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("Request Failed"));
});
//getUser PUT middleware
async function getUser(req, res, next) {
    let videogame;
    try {
        videogame = await Videogame.findById(req.params.id);
      if (videogame == null) {
        return res.status(404).json({ message: "Cannot find videogame" });
      }
    } catch (err) {
    }
    res.videogame = videogame;
    next();
}


  

  
  

module.exports = router;