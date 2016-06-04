'use strict'

var fs = require("fs");
var multer = require("multer");
var dialog = require('dialog');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage });
var fileUpload = upload.single('newFile');

module.exports = function(app, File) {
  app.post('/uploads', function(req, res) {
    fileUpload(req, res, function(err) {
      if(err) console.log(err);
      var fileObject = {
        name: req.file.originalname,
        size: req.file.size,
        date: new Date().toLocaleString()
      };
      var file = new File(fileObject);
      // Saving into the db
      file.save(function(err, file) {
        if(err) console.log(err);
        console.log('Saved ' + file);
      });
      var path = "./uploads/" + req.file.filename;
      fs.unlinkSync(path);
      res.json(fileObject);
    })
  })
}
