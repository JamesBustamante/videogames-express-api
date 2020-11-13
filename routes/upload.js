const Videogame = require("../models/Videogame");
var formidable = require('formidable');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');


// Upload image GET - show page
router.get('/', async (req, res) => {
    console.log("upload");
    res.sendFile(__dirname + '/index.html');
    //res.sendFile(__dirname + '/index.html');
});

// Upload image with data POST
router.post('/', (req, res) => {
    var dbObj = {
        title: "",
        platform: "",
        releaseDate: "",
        image: ""
    }
    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            dbObj[name] = field;
            console.log(dbObj);
        })
        .on('fileBegin', function (name, file) {
            var parentDir = path.normalize(__dirname + "/..");
            file.path = parentDir + '/uploads/' + file.name;
            dbObj["image"] = file.name;
          
        })
        .on('file', (name, file) => {
            console.log('Uploaded file')
        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', () => {
            
            console.log("FINSHEDDDDD------")
            const result = saveGame(dbObj, res);
            res.end()
        })
    //   console.log(dbObj);
    //   dbObj["_id"] = new mongoose.Types.ObjectId();
  
    //   const videogame = new Videogame(dbObj);
    //   videogame
    //     .save()
  
    //   res.sendFile(__dirname + '/index.html');
    
    
})
  
function saveGame(dbObj, res) {
    console.log(dbObj);
      dbObj["_id"] = new mongoose.Types.ObjectId();
  
      const videogame = new Videogame(dbObj);
      videogame
          .save()
          .then(() => { 
              isSaved = true;
          })
          .catch()
    return isSaved;
}

  
module.exports = router;