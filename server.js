const express = require('express');
const app = express();
app.listen(3000, () => console.log('server has started at port 3000'));

app
  .get("/", (req, res) => {
    console.log(req.url);
    res.send("<h1>Hello</h1>"); //determine the content-type automatically
  })
  .post("/", (req, res) => {})
  .patch("/", (req, res) => {})
  .put("/", (req, res) => {})
  .delete("/", (req, res) => {});