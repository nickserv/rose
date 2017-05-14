const express = require('express');
const path = require('path');
const logger = require('morgan');

const engine = require('./lib/engine');
const features = require('./features');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/* GET JSON API. */
app.get('/index.json', (req, res) => {
  const results = engine.search(features, req.query.query);
  const skip = parseInt(req.query.index, 10) || 0;
  const limit = parseInt(req.query.count, 10) || undefined;

  res.json(results.slice(skip, limit && skip + limit));
});

if (!module.parent) app.listen(process.env.PORT || 3000);

module.exports = app;
