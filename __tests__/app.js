const app = require('../app');
const nodeFetch = require('node-fetch');
const seeds = require('../lib/seeds');
const seedData = require('./seedData');

describe('app', () => {
  function fetch(path, init) {
    return nodeFetch(`http://localhost:3000${path}`, init);
  }

  beforeAll(() => seeds(seedData));
  beforeAll(done => app.listen(3000, done));

  describe('GET /', () => {
    it('responds with success', () => {
      return fetch('/').then(response => expect(response.status).toBe(200));
    });
  });

  describe('GET /index.json', () => {
    it('responds with features', () => {
      return fetch('/index.json', {
        headers: { 'Content-Type': /json/ }
      }).then(response => {
        expect(response.status).toBe(200);
        return response.json();
      }).then(response => expect(response.length).toBeGreaterThan(0));
    });
  });

  describe('GET /404', () => {
    it('responds with a 404 error', () => {
      return fetch('/404').then(response => expect(response.status).toBe(404));
    });
  });
});
