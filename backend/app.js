const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const morgan = require('morgan');
const passport = require('passport');
const configurePassport = require('./utils/passport.js');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const router = require('./routes');

switch (app.get('env')) {
  case 'development':
    app.use(cors());
    break;

  case 'production':
    app.use(cors({ origin: config.FRONTEND_URL }));
    break;
}
app.use(express.json());
app.use(morgan('tiny'));

configurePassport(passport);
app.use(passport.initialize());

app.use('/', router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
