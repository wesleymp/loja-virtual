const request = require('supertest');
const { connection } = require('../../src/models/connection');
const app = require('../../src/main/app');
const { crypt } = require('../../src/services/helpers/bcrypt');

describe('Rota [POST] /login', () => {
  beforeAll(async () => {
    const hashPassword = crypt('valid_password');
    const conn = await connection.connect();
    await conn.query(`INSERT INTO "user" ("name", "password", "email") VALUES ('valid_name', '${hashPassword}', 'valid_email@mail.com')`);
  });

  afterAll(async () => {
    const conn = await connection.connect();
    await conn.query('DELETE FROM "user" WHERE email != $1', ['admin@mail.com']);
  });

  it('deve retornar um status 400 se não informar uma senha', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'valid_email@mail.com',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se informar uma senha menor que 6 caracteres', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'valid_email@mail.com',
        password: '12345',
      })
      .expect(400)
      .end(done);
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
