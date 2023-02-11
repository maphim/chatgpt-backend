import express from 'express';
const router = express.Router();

const Conversation = require('../libs/conversation');
const Speech = require('../libs/speech');

router.get('/', function (req, res) {
    const s = new Speech();
    const link = s.transText2Voice('xin chao ban');
    console.log(link);
    res.send(`homepage`);
})

export default router;
