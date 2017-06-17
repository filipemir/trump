/* eslint no-console: "off" */
require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express'),
  favicon = require('serve-favicon'),
  Quote = require('./models/quotes'),
  paths = require('../paths'),
  app = express(),
  port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', paths.views);

app.use(express.static(paths.dist.rootDir));
app.use('/audio', express.static(paths.static.aud));
app.use('/fonts', express.static(paths.static.fonts));
app.use('/img', express.static(paths.static.img));
app.use(favicon(`${paths.static.img}/face.png`));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/trumpism', function(req, res) {
  const num = req.query.num ? parseInt(req.query.num) : '';

  // Return a random quote:
  Quote.findRandom(num).then((quote) => {
    res.json(quote);
  }).catch((error) => {
    res.status(500).json({ error });
  });
});

app.use(function(req, res) {
  res.redirect('/')
});

app.listen(port, function() {
  console.log(`Port ${port} is open for visitors`);
});
