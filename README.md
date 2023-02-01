Build the chat backend to communicate with the GPT-3 API and store conversation infomation on the server.

# Features

- [x] Create api chat with GPT.
- [x] Store converations.
- [ ] Speak via Google Speech (Google Translate)

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
