var mongoose = require('mongoose');

var uristring = 'mongodb://localhost/trump';

mongoose.connect(uristring, function(err) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

module.exports = mongoose;
