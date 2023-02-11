import express from 'express';
const router = express.Router();

import Speech from '../libs/speech.js';
import Conversation from '../libs/conversation.js';

router.get('/', function (req, res) {
    const s = new Speech();
    const link = s.transText2Voice('xin chao ban');
    console.log(link);
    res.send(`homepage`);
})

export default router;
