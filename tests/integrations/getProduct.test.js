const sinon = require('sinon');
const request = require('supertest');
const models = require('../../src/models');
const app = require('../../src/main/app');
const { genereteJwt } = require('../../src/util/jwt');
const products = require('../memory-data/products');

describe('Rota [GET] /product', () => {
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
      .get('/product')
      .expect(401)
      .end(done);
  });

  it('deve retornar um status 404 se não existir produtos cadastrados', (done) => {
    sinon.stub(models, 'getProductModel').resolves([]);
    request(app)
      .get('/product')
      .set('Authorization', token)
      .expect(404)
      .end(done);
  });

  it('deve retornar um status 200 se encontrar produtos cadastrados', (done) => {
    sinon.stub(models, 'getProductModel').resolves([products]);
    request(app)
      .get('/product')
      .set('Authorization', token)
      .expect(200)
      .end(done);
  });
});
