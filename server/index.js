const express = require('express');
const path = require('path');
const logger = require('morgan');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');

const engine = require('./engine');
const features = require('../dist/features');

const app = express();

app.use(logger('dev'));
app.use(express.static('client'));
app.use(app.get('env') === 'development' ?
        webpackMiddleware(webpack(webpackConfig)) :
        express.static('dist'));

/* GET JSON API. */
app.get('/index.json', (req, res) => {
  const results = engine.search(features, req.query.query);
  const skip = parseInt(req.query.index, 10) || 0;
  const limit = parseInt(req.query.count, 10) || undefined;

  res.json(results.slice(skip, limit && skip + limit));
});

if (!module.parent) app.listen(process.env.PORT || 3000);

module.exports = app;
