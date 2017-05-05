const app = require('../app');
const request = require('request');
const seeds = require('../lib/seeds');
const seedData = require('./seedData');

describe('app', () => {
  beforeAll(() => seeds(seedData));
  beforeAll(done => app.listen(3000, done));

  describe('GET /', () => {
    it('responds with success', done => {
      request('http://localhost:3000/', (error, response) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /index.json', () => {
    it('responds with features', done => {
      request('http://localhost:3000/index.json', {
        headers: { 'Content-Type': /json/ }
      }, (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(body.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('GET /404', () => {
    it('responds with a 404 error', done => {
      request('http://localhost:3000/404', (error, response) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(404);
        done();
      });
    });
  });
});
