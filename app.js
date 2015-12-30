var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var Feature = require('./lib/feature');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/* GET JSON API. */
app.get('/index.json', function (req, res) {
  Feature.search(req.query.query)
         .skip(parseInt(req.query.index, 10))
         .limit(parseInt(req.query.count, 10))
         .then(function (docs) {
    res.json(docs);
  });
});

module.exports = app;
