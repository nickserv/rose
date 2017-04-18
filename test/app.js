require('./test_helper');

describe('app', () => {
  before(mockedSeeds);

  describe('GET /', () => {
    it('responds with success', done => {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });
  });

  describe('GET /index.json', () => {
    it('responds with features', done => {
      request(app)
        .get('/index.json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).to.have.length.above(0);
        })
        .end(done);
    });
  });

  describe('GET /404', () => {
    it('responds with a 404 error', (done) => {
      request(app)
        .get('/404')
        .expect(404)
        .end(done);
    });
  });
});
