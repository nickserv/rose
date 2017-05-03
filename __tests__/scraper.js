require('./test_helper');

describe('scraper', function () {
  const tableHTML = fs.readFileSync(__dirname + '/pages/table.html', 'utf8');
  const $ = cheerio.load(tableHTML);

  const expectedTechnologies = ['git', 'mercurial'];
  const expectedFeatures = [{
    name: 'add files',
    examples: [
      { technology: 'git', snippets: 'git add' },
      { technology: 'mercurial', snippets: 'hg add' }
    ]
  }, {
    name: 'show revision information line by line',
    examples: [
      { technology: 'git', snippets: 'git blame' },
      { technology: 'mercurial', snippets: 'hg annotate' }
    ]
  }];

  describe('.scrapeTechnologies()', function () {
    it('scrapes all technology names from a table header row', function () {
      expect(scraper.scrapeTechnologies($('tr').eq(0), $)).to.eql(expectedTechnologies);
    });
  });

  describe('.scrapeFeature()', function () {
    it('scrapes a feature from a table row', function () {
      expect(scraper.scrapeFeature($('tr').eq(1), $, expectedTechnologies)).to.eql(expectedFeatures[0]);
    });
  });

  describe('.scrapeTable()', function () {
    describe('with a table with no extra data', function () {
      it('scrapes all features from the table', function () {
        expect(scraper.scrapeTable($('table'), $)).to.eql(expectedFeatures);
      });
    });

    describe('with a table with extra data', function () {
      const tableHTML = fs.readFileSync(__dirname + '/pages/table_extra.html', 'utf8');
      const $ = cheerio.load(tableHTML);

      const expectedFeatures = [{
        name: 'add files',
        examples: [
          { technology: 'git', snippets: 'git add' },
          { technology: 'mercurial', snippets: 'hg add' }
        ]
      }, {
        name: 'show revision information line by line',
        examples: [
          { technology: 'git', snippets: 'git blame' },
          { technology: 'mercurial', snippets: 'hg annotate' },
          { technology: 'svn', snippets: 'svn blame' }
        ]
      }];

      it('scrapes all features from the table, ignoring extra data', function () {
        expect(scraper.scrapeTable($('table'), $)).to.eql(expectedFeatures);
      });
    });
  });

  describe('.getPages()', function () {
    it('gets a list of all Rosetta Stone pages from http://hyperpolyglot.org/', function (done) {
      scraper.getPages().then(function (pages) {
        expect(pages.length).to.be.above(0);
        pages.forEach(function (page) {
          var pageURL = url.parse(page);
          expect(pageURL.host).to.equal('hyperpolyglot.org');
          expect(pageURL.pathname).to.match(/[a-z-]+/);
        });
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  })

  describe('.requestPromise()', function () {
    describe('after a successful request', function () {
      it('wraps request() and returns a Promise that will be resolved', function () {
        expect(scraper.requestPromise('http://www.google.com/')).to.be.fulfilled;
      });
    });

    describe('after a failed request', function () {
      it('wraps request() and returns a Promise that will be rejected', function () {
        expect(scraper.requestPromise('http://www.google.com/404')).to.be.rejected;
      });
    });
  });

  describe('.scrape()', function () {
    it('scrapes features from the Hyperpolyglot website', function (done) {
      scraper.scrape().then(function (seeds) {
        seeds.forEach(function (seed) {
          (new Feature(seed)).validate(function (err) {
            if (err) {
              done(err);
            }
          });
        });
        done();
      });
    });
  });
});
