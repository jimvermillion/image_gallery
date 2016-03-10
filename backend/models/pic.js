'use strict';

const mongoose = require('mongoose');

var picSchema = new mongoose.Schema({
  url: { type: String, required: true },
  desc: { type: String, default: 'no description' }
});

module.exports = exports = mongoose.model('Pic', picSchema);
