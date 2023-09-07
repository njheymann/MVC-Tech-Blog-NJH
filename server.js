// Express.js server setup
require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");

const helpers = require("./utils/auth.js");

const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3030;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: "auto",
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000, // 72 hours in milliseconds
  },
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize
  .sync({
    force: false,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log("Now listening on http://localhost:3030/home")
    );
  });
