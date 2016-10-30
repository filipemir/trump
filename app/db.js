/* eslint no-console: "off" */
const config = require('./config.js'),
  mongoose = require('mongoose'),
  uristring = config.db[process.env.NODE_ENV];

mongoose.connect(uristring, function(err) {
  if (err) {
    console.log (`ERROR connecting to: ${uristring}. ${err}`);
  } else {
    console.log (`Succeeded connecting to: ${uristring}`);
  }
});

// Use the native JS promise class
mongoose.Promise = global.Promise;

module.exports = mongoose;
