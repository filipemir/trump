/* eslint no-console: "off" */
const mongoose = require('mongoose'),
  uristring = 'mongodb://localhost/trump';

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