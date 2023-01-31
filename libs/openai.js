const axios = require('axios');

axios.defaults.baseURL = 'https://api.openai.com/v1/';

const OpenAI = {

    token: null,

    setToken: function (token) {
        this.token = token;
    },

    _request: async function (path, predata = {}) {
        if (!this.token) {
            throw new Error('Please insert your token');
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
            console.log(`Request`, predata);
            const { data } = await axios.post(path, predata, { headers });
            return data;
        } catch (error) {
            console.log(`Error`, error.message);
            return error;
        }
    },

    completions: async function (data) {
        const __default = {
            "model": "text-davinci-003",
            "prompt": "Say this is a test",
            "max_tokens": 100,
            "temperature": 0,
            "top_p": 1,
            "stop": ["\n"]
        };
        return await this._request('completions', { ...__default, ...data });
    },

}

module.exports = OpenAI;