/* eslint no-console: "off" */
const config = require('./config.js'),
  mongoose = require('mongoose');

const URI = config.db.URI;

mongoose.connect(URI, function(err) {
  if (err) {
    console.log (`ERROR connecting to: ${URI}. ${err}`);
  } else {
    console.log (`Succeeded connecting to: ${URI}`);
  }
});

// Use the native JS promise class
mongoose.Promise = global.Promise;

module.exports = mongoose;
