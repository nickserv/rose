import cheerio from 'cheerio';
import fs from 'fs';
import * as loader from '../server/loader';
import url from 'url';

describe('loader', () => {
  const tableHTML = fs.readFileSync('__tests__/pages/table.html', 'utf8');
  const $ = cheerio.load(tableHTML);

  const expectedTechnologies = ['git', 'mercurial'];
  const expectedFeatures = [{
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

  describe('.scrapeTechnologies()', () => {
    it('scrapes all technology names from a table header row', () => {
      expect(loader.scrapeTechnologies($('tr').eq(0), $)).toEqual(expectedTechnologies);
    });
  });

  describe('.scrapeFeature()', () => {
    it('scrapes a feature from a table row', () => {
      expect(loader.scrapeFeature($('tr').eq(1), $, expectedTechnologies)).toEqual(expectedFeatures[0]);
    });
  });

  describe('.scrapeTable()', () => {
    describe('with a table with no extra data', () => {
      it('scrapes all features from the table', () => {
        expect(loader.scrapeTable($('table'), $)).toEqual(expectedFeatures);
      });
    });

    describe('with a table with extra data', () => {
      const tableHTML = fs.readFileSync('__tests__/pages/table_extra.html', 'utf8');
      const $ = cheerio.load(tableHTML);

      const expectedFeatures = [{
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

      it('scrapes all features from the table, ignoring extra data', () => {
        expect(loader.scrapeTable($('table'), $)).toEqual(expectedFeatures);
      });
    });
  });

  describe('.getPages()', () => {
    it('gets a list of all Rosetta Stone pages from http://hyperpolyglot.org/', () => {
      return loader.getPages().then(pages => {
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

    it('scrapes features from the Hyperpolyglot website', () => {
      return expect(loader.scrape()).resolves.not.toHaveLength(0);
    });
  });
});
