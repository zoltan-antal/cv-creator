const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const config = require('./utils/config');
const configurePassport = require('./utils/passport.js');
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

configurePassport(passport);
app.use(
  session({
    secret: config.AUTH_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

module.exports = app;
