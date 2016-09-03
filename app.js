const express = require('express'),
  Quote = require('./app/models/quotes'),
  paths = require('./paths');

const app = express();

app.set('view engine', 'pug');
app.set('views', paths.views);
app.use(express.static(paths.src.rootDir));

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
