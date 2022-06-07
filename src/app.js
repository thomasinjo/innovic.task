const express = require('express');
const bodyParser = require('body-parser')

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(bodyParser.json())

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


module.exports = app;
