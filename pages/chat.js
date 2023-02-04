const express = require('express');
const router = express.Router();

const openai = require('../libs/openai');
const Speech = require('../libs/speech');
const Conversation = require('../libs/conversation');

router.get('/', function (req, res) {
    res.send(`this is chat page`);
})

router.post('/message', async function (req, res) {
    const { token, id, prompt } = req.body;

    if (token) {
        openai.setToken(token);
    }

    const speech = new Speech();

    const chat = new Conversation(id);
    chat.setMessage('question', prompt);

    const resp = await openai.completions({ prompt: chat.makePromt() });
    console.log(resp);

    if (resp && resp.choices) {
        const answer = resp.choices[0].text;
        const voice = speech.makeVoice(answer);
        const voices = speech.makeVoices(answer);
        chat.setMessage('answer', answer);
        return res.send({ id: chat._id, message: chat.lastMessage, voice, voices, items: chat._data.items });
    }

    res.send(`error send message`);
})

module.exports = router;
