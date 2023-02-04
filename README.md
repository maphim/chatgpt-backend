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

Result
```
    "voice": "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=t&q=Vi%E1%BB%87t%20Nam%20c%C3%B3%20di%E1%BB%87n%20t%C3%ADch%20l%C3%A0%20331.690%20km2.%20Ch%C3%BAc%20b%E1%BA%A1n%20c%C3%B3%20m%E1%BB%99t%20ng%C3%A0y%20tuy%E1%BB%87t%20v%E1%BB%9Di!&tk=402504.24837",
    "voices": [
        "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=t&q=Vi%E1%BB%87t%20Nam%20c%C3%B3%20di%E1%BB%87n%20t%C3%ADch%20l%C3%A0%20331&tk=634649.1043028",
        "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=t&q=690%20km2&tk=442696.33797",
        "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=t&q=Ch%C3%BAc%20b%E1%BA%A1n%20c%C3%B3%20m%E1%BB%99t%20ng%C3%A0y%20tuy%E1%BB%87t&tk=776120.889589",
        "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=t&q=v%E1%BB%9Di!&tk=209484.358145"
    ],
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
