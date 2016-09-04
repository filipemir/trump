/* eslint no-console: "off" */
const express = require('express'),
  Quote = require('./app/models/quotes'),
  paths = require('./paths');

const app = express();

app.set('view engine', 'pug');
app.set('views', paths.views);
app.use(express.static(paths.dist.rootDir));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/trumpism/another-one', function(req, res) {
  // Return a random quote:
  Quote.findRandom().then((quote) => {
    res.json({ quote });
  }).catch((error) => {
    res.status(500).json({ error });
  });
});

app.listen(3000, function() {
  console.log('Port 3000 is open for visitors');
});
