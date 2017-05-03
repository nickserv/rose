describe('app', () => {
  beforeAll(mockedSeeds);

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
        .expect(res => {
          expect(res.body).to.have.length.above(0);
        });
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
