const sinon = require('sinon');
const request = require('supertest');
const models = require('../../src/models');
const app = require('../../src/main/app');
const { genereteJwt } = require('../../src/util/jwt');
const profile = require('../memory-data/profile');

describe('Rota [GET] /profile', () => {
  const token = genereteJwt({ id: 2, id_role: 2 });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 401 se o usuário não estiver autenticado', (done) => {
    request(app)
      .get('/profile')
      .expect(401)
      .end(done);
  });

  it('deve retornar um status 200 se o usuário estiver autenticado', (done) => {
    sinon.stub(models, 'profileModel').resolves([profile]);
    request(app)
      .get('/profile')
      .set('Authorization', token)
      .expect(200)
      .end(done);
  });
});
