const sinon = require('sinon');
const request = require('supertest');
const models = require('../../src/models');
const app = require('../../src/main/app');
const { genereteJwt } = require('../../src/util/jwt');
const users = require('../memory-data/users');

describe('Rota [GET] /management', () => {
  const data = {
    id: 1,
    id_role: 1,
  };
  const token = genereteJwt(data);

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 401 se o usuário não estiver autenticado', (done) => {
    request(app)
      .get('/management')
      .expect(401)
      .end(done);
  });

  it('deve retornar um status 403 se o usuário não for admin', (done) => {
    request(app)
      .get('/management')
      .set('Authorization', genereteJwt({ id: 2, id_role: 2 }))
      .expect(403)
      .end(done);
  });

  it('deve retornar um status 404 se não existir usuários cadastrados', (done) => {
    sinon.stub(models, 'getManagementModel').resolves([]);
    request(app)
      .get('/management')
      .set('Authorization', token)
      .expect(404)
      .end(done);
  });

  it('deve retornar um status 200 se encontrar usuários cadastrados', (done) => {
    sinon.stub(models, 'getManagementModel').resolves([users]);
    request(app)
      .get('/management')
      .set('Authorization', token)
      .expect(200)
      .end(done);
  });
});
