const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');

app.use(cors());
app.use(express.json());

app.get('/ping', (request, response) => {
  response.send('Hello');
});

module.exports = app;
