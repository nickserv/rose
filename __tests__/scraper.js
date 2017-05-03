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
      expect(scraper.scrapeTechnologies($('tr').eq(0), $)).toEqual(expectedTechnologies);
    });
  });

  describe('.scrapeFeature()', function () {
    it('scrapes a feature from a table row', function () {
      expect(scraper.scrapeFeature($('tr').eq(1), $, expectedTechnologies)).toEqual(expectedFeatures[0]);
    });
  });

  describe('.scrapeTable()', function () {
    describe('with a table with no extra data', function () {
      it('scrapes all features from the table', function () {
        expect(scraper.scrapeTable($('table'), $)).toEqual(expectedFeatures);
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
        expect(scraper.scrapeTable($('table'), $)).toEqual(expectedFeatures);
      });
    });
  });

  describe('.getPages()', function () {
    it('gets a list of all Rosetta Stone pages from http://hyperpolyglot.org/', function () {
      return scraper.getPages().then(function (pages) {
        expect(pages.length).toBeGreaterThan(0);
        pages.forEach(function (page) {
          var pageURL = url.parse(page);
          expect(pageURL.host).toBe('hyperpolyglot.org');
          expect(pageURL.pathname).toMatch(/[a-z-]+/);
        });
      });
    });
  })

  describe('.requestPromise()', function () {
    describe('after a successful request', function () {
      it('wraps request() and returns a Promise that will be resolved', function () {
        return scraper.requestPromise('http://www.google.com/')
      });
    });

    describe('after a failed request', function () {
      it('wraps request() and returns a Promise that will be rejected', function (done) {
        scraper.requestPromise('http://www.google.com/404')
          .then(() => done(true))
          .catch(() => done());
      });
    });
  });

  describe('.scrape()', function () {
    it('scrapes features from the Hyperpolyglot website', function () {
      return scraper.scrape().then(function (seeds) {
        seeds.forEach(function (seed) {
          (new Feature(seed)).validate(function (err) {
            if (err) throw err;
          });
        });
      });
    });
  });
});
