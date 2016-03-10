'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Pic = require(__dirname + '/../models/pic');

var picRouter = module.exports = exports = express.Router(); // eslint-disable-line

picRouter.get('/pic', (req, res) => {
  Pic.find({}, (err, pics) => {
    if (err) return res.status(500).json({ msg: 'error getting pics from db' });
    res.status(200).json(pics);
  });
});

picRouter.post('/pic', jsonParser, (req, res) => {
  console.log(req.body);
  var newPic = new Pic(req.body);
  newPic.save((err, data) => {
    if (err) 
      return res.status(500).json({ msg: 'error saving to db', error: err });
    res.status(200).json(data);
  });
});
