'use strict'

var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var routes = require("./app/routes/routes.js");
var api = require("./app/api/api.js");
var PORT = process.env.PORT || 3000;
var app = express();
require('dotenv').config({
  silent: true
});

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "jade");

var Schema = mongoose.Schema;
var mongouri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/uploads';

var fileSchema = new Schema({
  name: String,
  size: Number,
  date: String
});

var File = mongoose.model('File', fileSchema);
mongoose.connect(mongouri);

routes(app);
api(app, File);

app.listen(PORT, function() {
  console.log("Node.js listening on port " + PORT)
})
