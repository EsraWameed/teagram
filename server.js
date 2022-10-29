const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const fileUpload = require("express-fileupload");
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { promises: Fs } = require('fs')
const app = express();
const PORT = process.env.PORT || 3001;
app.use(fileUpload());
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
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use(routes);


//////////
// app.get("/dashboard", async (req, res) => {
//   try {
//       const userData = await User.findAll({
//           where: { "id": 1 }
//       })

//       const users = userData.map((project) => project.get({ plain: true }));
//       console.log(users)
//       res.render("profileimg", {
//           users
//       })
//   } catch (err) {
//       res.status(500).json(err)
//   }
// })
////////

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});