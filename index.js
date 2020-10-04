const express = require('express');
const path = require('path');
const axios = require('axios');
const querystring = require('querystring');

const app = express();

app.use('/', express.static('ng-spotify-ui/dist'));
app.use(function (req, res, next) {
  if (req.ip !== '::1' && req.ip !== '::ffff:127.0.0.1') {
    res.status(401);
    return res.send('Permission denied');
  }
  next();
});

app.get('/api/token', function (req, res) {
  axios
    .post('https://accounts.spotify.com/api/token', querystring.stringify({ grant_type: 'client_credentials' }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`
      }
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(error.response.status);
      res.json(error.response.data);
    });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve('ng-spotify-ui/dist/index.html'));
});

app.listen(4200, function () {
  console.log('NG Spotify running on port 4200');
});
