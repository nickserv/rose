
/*
 * GET home page.
 */

var examplesJSON = require("../data.json");

function getExamples() {
  return Object.keys(examplesJSON).reduce(function (memo, technology) {
    examplesJSON[technology].forEach(function (data) {
      memo.push({
        technology: technology,
        code: data
      });
    });
    return memo;
  }, []);
}

function findExamples(query) {
  if(query) {
    return getExamples().filter(function (example) {
      return example.code.indexOf(query) > -1;
    });
    //return new Array(_.findWhere(exports.getLibraries(), { name: names }));
  } else {
    return getExamples();
  }
}

exports.index = function(req, res){
  res.render('index', {
    title: 'Rose',
    examples: findExamples(req.query.query)
  });
};
