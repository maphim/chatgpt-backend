import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import url from 'url';

const router = express.Router();

router.get('/', function (req, res) {
    res.send(`this is ytb page`);
});

export default router;
