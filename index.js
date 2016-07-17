var express = require('express'),
  lodash = require('lodash'),
  mongoose = require('mongoose');

var app = express();

app.get('/', function(req, res, next) {
  res.send('Shit trump says');
});

app.listen(3000, function() {
  console.log('Port 3000 is chugging away!');
});