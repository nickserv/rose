const app = require('../app');
const requestPromiseNative = require('request-promise-native');
const seeds = require('../lib/seeds');
const seedData = require('./seedData');

describe('app', () => {
  const request = requestPromiseNative.defaults({ baseUrl: 'http://localhost:3000/' });

  beforeAll(() => seeds(seedData));
  beforeAll(done => app.listen(3000, done));

  describe('GET /', () => {
    it('responds with success', () => {
      return request('/');
    });
  });

  describe('GET /index.json', () => {
    it('responds with features', () => {
      return request('/index.json', {
        headers: { 'Content-Type': /json/ }
      }).then(response => expect(response.length).toBeGreaterThan(0));
    });
  });

  describe('GET /404', () => {
    it('responds with a 404 error', () => {
      return request('/404', {
        resolveWithFullResponse: true,
        simple: false
      }).then(response => expect(response.statusCode).toBe(404));
    });
  });
});
