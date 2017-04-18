const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const Feature = require('./lib/feature');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/* GET JSON API. */
app.get('/index.json', (req, res) => {
  Feature.search(req.query.query)
         .skip(parseInt(req.query.index, 10))
         .limit(parseInt(req.query.count, 10))
         .then(docs => res.json(docs));
});

module.exports = app;
