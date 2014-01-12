
/*
 * GET home page.
 */

var featuresJSON = require("../data.json");

function getFeatures() {
  return Object.keys(featuresJSON).reduce(function (memo, technology) {
    featuresJSON[technology].forEach(function (data) {
      memo.push({
        technology: technology,
        name: data
      });
    });
    return memo;
  }, []);
}

function findFeatures(query) {
  if(query) {
    return getFeatures().filter(function (data) {
      return data.name.indexOf(query) > -1;
    });
    //return new Array(_.findWhere(exports.getLibraries(), { name: names }));
  } else {
    return getFeatures();
  }
}

exports.index = function(req, res){
  res.render('index', {
    title: 'Rose',
    results: findFeatures(req.query.query)
  });
};
