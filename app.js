const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Home page
const homeRoute = require('./pages/home');
app.use('/', homeRoute);

// Chat page
const chatRoute = require('./pages/chat');
app.use('/chat', chatRoute);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});