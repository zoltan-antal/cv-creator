const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/ping', (request, response) => {
  response.send('Hello');
});

module.exports = app;
