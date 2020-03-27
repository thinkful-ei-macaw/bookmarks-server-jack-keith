const app = require('../src/app');

describe('App', () => {
  describe('GET /bookmarks', () => {
    it('should return a list of bookmarks', () => {
      return supertest(app)
        .get('/bookmarks')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          expect(res.body[0]).to.have.all.keys(
            'id',
            'title',
            'url',
            'desc',
            'rating'
          );
        });
    });
  });

  describe('GET /bookmarks/:id', () => {
    it('should return a specific bookmark with id', () => {
      const bookmarkId = '8sdfbvbs65sd';
      return supertest(app)
        .get(`/bookmarks/${bookmarkId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(
            'id',
            'title',
            'url',
            'desc',
            'rating'
          );
        });
    });
    it('should return an error if id is invalid', () => {
      return supertest(app).get('/bookmarks/INVALID').expect(404);
    });
  });

  describe('POST /bookmarks', () => {
    const validBookmark = {
      id: '867-5309-jenny-jenny',
      title: 'Google',
      url: 'https://www.google.com/',
      desc: 'The best search engine. Period.',
      rating: 5
    };

    it('should create a new bookmark when all params valid', () => {
      return supertest(app).post('/bookmarks').send(validBookmark).expect(201);
    });

    ['title', 'url'].forEach(key => {
      it(`should send back a 400 error if ${key} is not provided`, () => {
        const invalidBookmark = { ...validBookmark, [key]: '' };
        return supertest(app)
          .post('/bookmarks')
          .send(invalidBookmark)
          .expect(400);
      });
    });

    it('should send back a 400 error if rating is not between 1 and 5', () => {
      const invalidBookmark = { ...validBookmark, rating: 500 };
      return supertest(app)
        .post('/bookmarks')
        .send(invalidBookmark)
        .expect(400);
    });

    it('should send back a 400 error is the url is less than 5 chars', () => {
      const invalidBookmark = { ...validBookmark, url: 'http' };
      return supertest(app)
        .post('/bookmarks')
        .send(invalidBookmark)
        .expect(400);
    });
  });

  describe('DELETE /bookmarks/:id', () => {
    it('deletes a bookmark when provided a valid id', () => {});

    it('sends back a 404 error when bookmark with id cannot be found', () => {
      const invalidId = 'INVALID-ID';
      return supertest(app).delete(`/bookmarks/${invalidId}`).expect(404);
    });
  });
});
