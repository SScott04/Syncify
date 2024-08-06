const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const app = express();
const port = 3000;

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.get('/', (req, res) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  });
  res.redirect(authorizeUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const {code} = req.query;
  const {tokens} = await client.getToken(code);
  client.setCredentials(tokens);
  res.send('Authentication successful!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


require('dotenv').config();
const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const app = express();
const port = 3000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.get('/', (req, res) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  });
  res.redirect(authorizeUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const {code} = req.query;
  const {tokens} = await client.getToken(code);
  client.setCredentials(tokens);
  res.send('Authentication successful!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


