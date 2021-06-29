const express = require('express');
const bodyParser = require('body-parser');
const activitiesRouter = require('./routes/activity_route.js');
const instructionRouter = require('./routes/instruction_route.js')
const participantRouter = require('./routes/participant_route.js');
const perfilRouter = require('./routes/perfil_route.js');
const sectionRouter = require('./routes/section_route.js');
const teamRouter = require('./routes/team_route.js');
const used_materialRouter = require('./routes/used_materials_route.js');
const user_typeRouter = require('./routes/user_type_route.js');
const userRouter = require('./routes/user_route.js');


const multer = require('multer')
const AWS = require('aws-sdk')
var crypto = require('crypto');


const app = express();
const port = 60000;

app.use(bodyParser.json());
// qunado criar o post exprimentar remover isto
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'sucess'});
})

// chamar pela atividades {'/atividades'}
app.use('/activities',activitiesRouter);
app.use('/instructions', instructionRouter);
app.use('/participant', participantRouter);
app.use('/perfil', perfilRouter);
app.use('/section', sectionRouter);
app.use('/team', teamRouter);
app.use('/used_material', used_materialRouter);
app.use('/user_type', user_typeRouter);
app.use('/user', userRouter);

const s3 = new AWS.S3({
  accessKeyId: "AKIAYH7OBXPB7HKLN7SZ",
  secretAccessKey: "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"
})

//create new s3 storage instance
const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
      callback(null, '')
  },filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      file.key = `${hash.toString("hex")}-${file.originalname}`;

      cb(null, file.key);
    })
  },
})

//post image to s3 server
app.post("/upload", multer({storage}).single('image'), (req, res) => {

  console.log("IN")
  
  function randomName(){
    var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
    "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
    "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
    "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
    "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
    "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
    "wandering", "withered", "wild", "black", "young", "holy", "solitary",
    "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  
    , nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
    "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
    "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
    "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
    "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
    "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
    "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
    "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
    "frog", "smoke", "star", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  
    return adjs[Math.floor(Math.random()*(adjs.length-1))]+"_"+nouns[Math.floor(Math.random()*(nouns.length-1))] + "_" +
    adjs[Math.floor(Math.random()*(adjs.length-1))]+ "_scoutshub" + "_mindoverflow_" + req.file.originalname;
  }
  

  let myImage = req.file.originalname.split(".")
  const fileType = myImage[myImage.length - 1]
  const { originalname : name, size, key, location: url = ""} = req.file

  const params = {
      Bucket: "scoutshub",
      Key: randomName(),
      Body: req.file.buffer,
      region: process.env.DEFAULT_REGION,
      ACL: "public-read"
  }

  s3.upload(params, (error, data) => {
      if(error){
          res.status(500).send(error)
      }

      res.status(200).send(data)
  })
})

app.listen(port, () => {
  console.log(`Scouts Hub app listening at http://localhost:${port}`)
});