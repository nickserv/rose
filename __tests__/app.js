const app = require('../app');
const request = require('supertest');
const seeds = require('../lib/seeds');
const seedData = require('./seedData');

describe('app', () => {
  beforeAll(() => seeds(seedData));

  describe('GET /', () => {
    it('responds with success', () => {
      return request(app)
        .get('/')
        .expect(200);
    });
  });

  describe('GET /index.json', () => {
    it('responds with features', () => {
      return request(app)
        .get('/index.json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => expect(res.body).not.toHaveLength(0));
    });
  });

  describe('GET /404', () => {
    it('responds with a 404 error', () => {
      return request(app)
        .get('/404')
        .expect(404);
    });
  });
});
