const cheerio = require('cheerio');
const features = require('../lib/features');
const fs = require('fs');
const scraper = require('../lib/scraper');
const url = require('url');

describe('scraper', () => {
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

  describe('.scrapeTechnologies()', () => {
    it('scrapes all technology names from a table header row', () => {
      expect(scraper.scrapeTechnologies($('tr').eq(0), $)).toEqual(expectedTechnologies);
    });
  });

  describe('.scrapeFeature()', () => {
    it('scrapes a feature from a table row', () => {
      expect(scraper.scrapeFeature($('tr').eq(1), $, expectedTechnologies)).toEqual(expectedFeatures[0]);
    });
  });

  describe('.scrapeTable()', () => {
    describe('with a table with no extra data', () => {
      it('scrapes all features from the table', () => {
        expect(scraper.scrapeTable($('table'), $)).toEqual(expectedFeatures);
      });
    });

    describe('with a table with extra data', () => {
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

      it('scrapes all features from the table, ignoring extra data', () => {
        expect(scraper.scrapeTable($('table'), $)).toEqual(expectedFeatures);
      });
    });
  });

  describe('.getPages()', () => {
    it('gets a list of all Rosetta Stone pages from http://hyperpolyglot.org/', () => {
      return scraper.getPages().then(pages => {
        expect(pages).not.toHaveLength(0)
        pages.forEach(page => {
          var pageURL = url.parse(page);
          expect(pageURL.host).toBe('hyperpolyglot.org');
          expect(pageURL.pathname).toMatch(/[a-z-]+/);
        });
      });
    });
  })

  describe('.scrape()', () => {
    it('scrapes features from the Hyperpolyglot website', () => {
      return expect(scraper.scrape()).resolves.not.toHaveLength(0);
    });
  });
});
