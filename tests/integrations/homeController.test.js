const request = require('supertest');

const app = require('../../src/main/app');

describe('Controller homeController', () => {
  it('deve retornar um status 200 ao acessar a rota', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });

  it('deve retornar uma mensagem { message: "OK" } ao acessar a rota', (done) => {
    request(app)
      .get('/')
      .expect((res) => expect(res.body).toEqual({ message: 'OK' }))
      .end(done);
  });
});
