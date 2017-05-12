require('./test_helper');

var SECOND = 1000;

describe('scraper', function () {
  before(function () {
    var tableHTML = fs.readFileSync(__dirname + '/pages/table.html', 'utf8');
    this.$ = cheerio.load(tableHTML);

    this.expectedTechnologies = ['git', 'mercurial'];
    this.expectedFeatures = [{
      name: 'add files',
      examples: [
        { technology: 'git', snippet: 'git add' },
        { technology: 'mercurial', snippet: 'hg add' }
      ]
    }, {
      name: 'show revision information line by line',
      examples: [
        { technology: 'git', snippet: 'git blame' },
        { technology: 'mercurial', snippet: 'hg annotate' }
      ]
    }];
  });

  context('.scrapeTechnologies()', function () {
    it('scrapes all technology names from a table header row', function () {
      expect(scraper.scrapeTechnologies(this.$('tr').eq(0), this.$)).to.eql(this.expectedTechnologies);
    });
  });

  context('.scrapeFeature()', function () {
    it('scrapes a feature from a table row', function () {
      expect(scraper.scrapeFeature(this.$('tr').eq(1), this.$, this.expectedTechnologies)).to.eql(this.expectedFeatures[0]);
    });
  });

  context('.scrapeTable()', function () {
    context('with a table with no extra data', function () {
      it('scrapes all features from the table', function () {
        expect(scraper.scrapeTable(this.$('table'), this.$)).to.eql(this.expectedFeatures);
      });
    });

    context('with a table with extra data', function () {
      before(function () {
        var tableHTML = fs.readFileSync(__dirname + '/pages/table_extra.html', 'utf8');
        this.$ = cheerio.load(tableHTML);

        this.expectedFeatures = [{
          name: 'add files',
          examples: [
            { technology: 'git', snippet: 'git add' },
            { technology: 'mercurial', snippet: 'hg add' }
          ]
        }, {
          name: 'show revision information line by line',
          examples: [
            { technology: 'git', snippet: 'git blame' },
            { technology: 'mercurial', snippet: 'hg annotate' },
            { technology: 'svn', snippet: 'svn blame' }
          ]
        }];
      });

      it('scrapes all features from the table, ignoring extra data', function () {
        expect(scraper.scrapeTable(this.$('table'), this.$)).to.eql(this.expectedFeatures);
      });
    });
  });

  context('.getPages()', function () {
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

  context('.requestPromise()', function () {
    context('after a successful request', function () {
      it('wraps request() and returns a Promise that will be resolved', function () {
        return expect(scraper.requestPromise('http://www.google.com/')).to.be.fulfilled;
      });
    });

    context('after a failed request', function () {
      it('wraps request() and returns a Promise that will be rejected', function () {
        return expect(scraper.requestPromise('http://www.google.com/404')).to.be.rejected;
      });
    });
  });

  context('.scrape()', function () {
    it('scrapes features from the Hyperpolyglot website', function () {
      this.timeout(60 * SECOND);
      return expect(scraper.scrape()).to.eventually.have.length.above(0);
    });
  });
});
