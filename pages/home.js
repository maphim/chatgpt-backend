const express = require('express');
const router = express.Router();

const Conversation = require('../libs/conversation');

router.get('/', function (req, res) {
    const c = new Conversation();
    res.send(`this is home page : ${c._id}`);
})

module.exports = router;