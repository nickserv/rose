import * as engine from './engine';
import express from 'express';
import fs from 'fs';
import logger from 'morgan';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackMiddleware from 'webpack-dev-middleware';

const app = express();
const features = JSON.parse(fs.readFileSync('dist/features.json'));

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

export default app;
