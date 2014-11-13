require('./test_helper');

describe('app', function () {
  before(function (done) {
    seeds().then(function () {
      done();
    });
  });

  describe('GET /', function () {
    it('responds with success', function (done) {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });
  });

  describe('GET /index.json', function () {
    it('responds with features', function (done) {
      request(app)
        .get('/index.json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.have.length.above(0);
        })
        .end(done);
    });
  });
});
