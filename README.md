Build the chat backend to communicate with the GPT-3 API and store conversation infomation on the server.

# Features

- [x] Create api chat with GPT.
- [x] Store converations.
- [x] Speak via Google Speech (Google Translate)
- [ ] Detect questions containing source code to properly navigate the model.

# Convert GPT-3's answer into sister Google's voice.

```
const speech = new Speech(your_key_language); // default vi
const voices = speech.makeVoices(answer); // list voices
```
![example send message](https://raw.githubusercontent.com/maphim/chatgpt-backend/main/images/voices.png?raw=true)


# How to use

1. Install package `npm install`
2. Install nodemon `npm -g install nodemon`
3. Run it `nodemon app.js`
4. Send message test to `http://localhost:3000/chat/message`

```
{
    "token": "YOUR_TOKEN_HERE",
    "id": "CONVERSATION_ID",
    "prompt": "THE FIRST QUESTION"
}
```
![example send message](https://raw.githubusercontent.com/maphim/chatgpt-backend/main/images/example.png?raw=true)
