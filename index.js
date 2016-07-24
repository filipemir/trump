var express = require('express'),
  lodash = require('lodash'),
  mongoose = require('mongoose'),
  db = require('./db'),
  Quote = require('./quotes');

var app = express();

app.set('view engine', 'pug');
app.use(express.static('static'));

app.get('/', function(req, res, next) {
  Quote.findRandom( function(err, quote) {
    res.render('index', quote);
  });
});

app.get('/trumpism/another-one', function(req, res, next) {
  Quote.findRandom( function(err, quote) {
    res.send(quote);
  });
});

app.listen(3000, function() {
  console.log('Port 3000 is chugging away!');
});
