import fetch from 'node-fetch';
import axios from 'axios';
import url from 'url';

export default class DownloadYTB {

    constructor() { }

    async request(url, params) {

        console.log(`${url} / params -> `, params);

        const queryString = new URLSearchParams(params).toString();
        return await fetch(url, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://yt1s.com/en428",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": queryString,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // read the body as text
            })
            .then(body => {
                return body;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    async fetchVideo(videoId) {
        const { vid, links } = await request(`https://yt1s.com/api/ajaxSearch/index`, {
            q: "https://youtu.be/8xHUXj1hSTE",
            vt: "home"
        })
        const r = await request(`https://yt1s.com/api/ajaxConvert/convert`, {
            vid,
            k: links.mp3.mp3128.k
        })
        return r;
    }

}
