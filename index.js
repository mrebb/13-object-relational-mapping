'use strict';

require('dotenv').config();
require('babel-register');
// Start up DB Server
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');
// This will require our "app.js" file and immediately call its 'start' method, sending the port from our .env
require('./src/app.js').start(process.env.PORT);