const sinon = require('sinon');
const request = require('supertest');
const app = require('../../src/main/app');
const models = require('../../src/models');
const { crypt } = require('../../src/services/helpers/bcrypt');

describe('Rota [POST] /login', () => {
  const dataModels = {
    id: 1,
    name: 'valid_name',
    password: crypt('valid_password'),
    email: 'valid_email@mail.com',
  };

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 400 se não informar um email', (done) => {
    request(app)
      .post('/login')
      .send({
        password: 'valid_password',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se informar um email inválido', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'valid_emailmail.com',
        password: 'valid_password',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um 200 caso o campo email/senha informado for válido', (done) => {
    sinon.stub(models, 'getUserModel').resolves({ rows: [dataModels], rowCount: 1 });
    const body = {
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/login')
      .send(body)
      .expect(200)
      .end(done);
  });

  it('deve retornar um token caso o campo email/senha informado for válido', (done) => {
    sinon.stub(models, 'getUserModel').resolves({ rows: [dataModels], rowCount: 1 });
    const body = {
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/login')
      .send(body)
      .then((res) => {
        expect(res.body).toHaveProperty('token');
        return done();
      });
  });
});
