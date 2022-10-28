const path = require('path');
const { promises: Fs } = require('fs')
const express = require('express');
const User = require("./models/User");
const session = require('express-session');
const exphbs = require('express-handlebars');
const fileUpload = require("express-fileupload");
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
app.use(fileUpload())
app.use(express.static("public"));
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
//connected to remote db
const sess = {
  secret: 'Super secret secret',
  cookie: {
        //session will expire in one hour idel time
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//userProfile
app.get("", async(req, res)=>{
  try{
      const userData = await User.findAll({
          where:{"id": 1}
      })
  
const users = userData.map((project)=> project.get({plain:true}));
console.log(users)
res.render("profilePicture", {
  users
})} catch (err){
  res.status(500).json(err)
}


})

//want to post
app.post("", async (req, res)=>{
 //start writing the upload functionality
//creare a variable name that will hold the file
  //keep consistent with form and call it sampleFile
  let sampleFile;
  let uploadPath;
//if object is empty send a message to alert
  if(!req.files || Object.keys(req.files).length === 0){
      return res.status(400).send("No pictures uploaded")
  }
//if not empty, grab the file
//name of the input is sampleFile. __dirname is main directory name
  sampleFile = req.files.sampleFile;

  //add code to remove. timestap function --> current# as uploadname
  uploadPath = __dirname + "/public/upload/" + sampleFile.name;
  //console log to see what object looks like
  console.log(sampleFile);
  const userData = await User.update({image_profile:`/upload/${sampleFile.name}`},{
      where:{"id":1}});
  //use mv() to place file on server. grab sampleFile object and pass the path
  
  sampleFile.mv(uploadPath, function(err){
      if(err) return res.status(500).send(err);
  

//if file is rendered, display a message
app.put("", async(req, res)=>{
  console.log("hello")
  try{
          console.log("hellooo")
userData.map((project)=> project.get({plain:true}));
document.location.reload()} 
catch (err){
  res.status(500).json(err)
}

});
})

  // res.send("File Uploaded");
res.redirect("/");

});























sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});