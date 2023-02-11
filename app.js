import express from 'express';
import path from 'path';

const app = express();

// Serve files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

import bodyParser from 'body-parser';
app.use(bodyParser.json());

// Home page
import homeRoute from './pages/home.js';
app.use('/', homeRoute);

// Chat page
import chatRoute from './pages/chat.js';
app.use('/chat', chatRoute);

// Youtube page
import ytbRoute from './pages/ytb.js';
app.use('/ytb', ytbRoute);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
