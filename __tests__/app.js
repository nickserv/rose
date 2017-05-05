const app = require('../app');
const requestPromise = require('../lib/scraper').requestPromise;
const seeds = require('../lib/seeds');
const seedData = require('./seedData');

describe('app', () => {
  beforeAll(() => seeds(seedData));
  beforeAll(done => app.listen(3000, done));

  describe('GET /', () => {
    it('responds with success', () => {
      return requestPromise('http://localhost:3000/');
    });
  });

  describe('GET /index.json', () => {
    it('responds with features', () => {
      return requestPromise('http://localhost:3000/index.json', {
        headers: { 'Content-Type': /json/ }
      }).then(body => expect(body.length).toBeGreaterThan(0));
    });
  });

  describe('GET /404', () => {
    it('responds with a 404 error', done => {
      requestPromise('http://localhost:3000/404')
        .then(() => done(true))
        .catch(error => {
          expect(error).toBeNull();
          done()
        })
        .catch(() => done(true));
    });
  });
});
