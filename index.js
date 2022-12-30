require('dotenv').config();

var express = require('express')
// var multer  = require('multer')
var port = process.env.PORT || 3000;
// const fs = require("fs");
const bodyParser = require("body-parser");
// const cloudinary = require('cloudinary').v2;

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');


var app = express()




/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-2',
  correctClockSkew: true,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only MP4 is allowed!'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'kaytechbucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

app.post('/upload', upload.single('video'), (req, res, next) => {
    const video = req.file;
    console.log(video);

    var response = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="static/main.css">
        <title>KingdomCtvn | Video Library</title>
    </head>
    <body>
        <h2 class="h2_query">Kingdom<span>Ctvn</span></h2>
            <div class="col-1" id="coll">
                <nav>
                    <h2 class="hide_query">Kingdom<span>Ctvn</span></h2>
                    <ul id="add" class="topnav">
                        <li><a href="main.html">Dashboard <i class="fa fa-user-o"></i></a></li>
                        <li><a href="video-lib.html">Video Library <i class="fa fa-video-camera"></i></a></li>
                        <li><a href="upload.html">Upload Video <i class="fa fa-cloud-upload"></i></a></li>
                    </ul>
                </nav>
            </div>
        <div class="mid">
           <i class="fa fa-check-circle" aria-hidden="true"></i>
        <br>
           <div> 
           
              <h3>Video uploaded successfully.</h3>
           
           </div>
                         
        </div>
      </body>
    </html>
    `
  //   response += "Video uploaded successfully.<br>"
  //   response += `<div><img src="${req.file.path}" /><br></div>`
    return res.send(response)

    // res.sendStatus(200);
  });
  

app.listen(port,() => console.log(`Server running on port ${port}!`))
