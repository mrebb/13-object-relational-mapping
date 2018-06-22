'use strict';

require('dotenv').config();
require('babel-register');
// Start up DB Server
const mongoose = require('mongoose');
let MONGODB_URI = 'mongodb://heroku_270zxqhk:6drl87pgjm2pv8968i9nhhmp90@ds015584.mlab.com:15584/heroku_270zxqhk';
mongoose.connect(MONGODB_URI);
// This will require our "app.js" file and immediately call its 'start' method, sending the port from our .env
require('./src/app.js').start(process.env.PORT);