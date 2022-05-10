const sinon = require('sinon');
const request = require('supertest');
const models = require('../../src/models');
const app = require('../../src/main/app');
const { genereteJwt } = require('../../src/util/jwt');

describe('Rota [POST] /management', () => {
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
      .post('/management')
      .send({
        id: 2,
        quantity: 20.00,
      })
      .expect(401)
      .end(done);
  });

  it('deve retornar um status 403 se o usuário não admin', (done) => {
    request(app)
      .post('/management')
      .set('Authorization', genereteJwt({ id: 2, id_role: 2 }))
      .send({
        id: 2,
        quantity: 20.00,
      })
      .expect(403)
      .end(done);
  });

  it('deve retornar um status 400 se não informar um id', (done) => {
    request(app)
      .post('/management')
      .set('Authorization', token)
      .send({
        quantity: 20.00,
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se não informar uma quantidade', (done) => {
    request(app)
      .post('/management')
      .set('Authorization', token)
      .send({
        id: 2,
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 201 todas informações forem enviadas corretamente', (done) => {
    sinon.stub(models, 'postManagementModel').resolves(true);
    request(app)
      .post('/management')
      .set('Authorization', token)
      .send({
        id: 2,
        quantity: 20.00,
      })
      .expect(201)
      .end(done);
  });
});
