import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import url from 'url';

import downloadYTB from '../libs/down.youtube.js';

const router = express.Router();

router.get('/', function (req, res) {
    try {
        const videoId = req.query.v;
        const { dlink } = downloadYTB.fetchVideo(videoId);

        const response = await axios.get(dlink, {
          responseType: 'stream'
        });

        res.set('Content-Type', 'video/mp4');
        response.data.pipe(res);

      } catch (error) {
        res.status(500).send(error.message);
      }
});

export default router;
