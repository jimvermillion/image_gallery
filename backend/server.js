'use strict';

const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pic_party');

const picRouter = require(__dirname + '/routes/picRouter');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authentication, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
}); 

app.use('/api', picRouter);

module.exports.server = app.listen(3000, () => console.log('server up on port: ' + 3000));
