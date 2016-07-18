var express = require('express'),
  lodash = require('lodash'),
  mongoose = require('mongoose'),
  db = require('./db'),
  Quote = require('./quotes');

var app = express();

app.get('/', function(req, res, next) {
  Quote.findRandom( function(err, quote) {
    res.send(quote.text);
  });
});

app.listen(3000, function() {
  console.log('Port 3000 is chugging away!');
});
