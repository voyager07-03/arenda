const express = require('express');
const app = express.Router();
const appController = require('../controllers/appController');

app.get('/', appController.rendApp);
app.get('/post/:postId', appController.rendPost);
app.post('/send-mail', appController.sendMail);
module.exports = app;