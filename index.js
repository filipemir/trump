var express = require('express'),
  Quote = require('./quotes');

var app = express();

app.set('view engine', 'pug');
app.use(express.static('static'));

app.get('/', function(req, res) {
  Quote.findRandom( function(err, quote) {
    res.render('index', quote);
  });
});

app.get('/trumpism/another-one', function(req, res) {
  Quote.findRandom( function(err, quote) {
    res.send(quote);
  });
});

app.listen(3000, function() {
  console.log('Port 3000 is chugging away!');
});
