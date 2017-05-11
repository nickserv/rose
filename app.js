const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const feature = require('./lib/feature');
const features = require('./features');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/* GET JSON API. */
app.get('/index.json', (req, res) => {
  const results = feature.search(features, req.query.query);
  const skip = parseInt(req.query.index, 10) || 0;
  const limit = parseInt(req.query.count, 10) || undefined;

  res.json(results.slice(skip, limit && skip + limit));
});

module.exports = app;
