const request = require('supertest');
const { connection } = require('../../src/models/connection');

const app = require('../../src/main/app');

describe('Rota [POST] /user', () => {
  afterEach(async () => {
    const conn = await connection.connect();
    await conn.query('DELETE FROM "user" WHERE email != $1', ['admin@mail.com']);
  });

  it('deve retornar um status 400 se não informar um nome', (done) => {
    request(app)
      .post('/user')
      .send({
        password: 'valid_password',
        email: 'valid_email@mail.com',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se informar um nome menor que 2 caracteres', (done) => {
    request(app)
      .post('/user')
      .send({
        name: '1',
        password: 'valid_password',
        email: 'valid_email@mail.com',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se não informar uma senha', (done) => {
    request(app)
      .post('/user')
      .send({
        name: 'valid_name',
        email: 'valid_email@mail.com',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se informar uma senha menor que 6 caracteres', (done) => {
    request(app)
      .post('/user')
      .send({
        name: 'valid_name',
        password: '12345',
        email: 'valid_email@mail.com',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se não informar um email', (done) => {
    request(app)
      .post('/user')
      .send({
        name: 'valid_name',
        password: 'valid_password',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 400 se informar um email inválido', (done) => {
    request(app)
      .post('/user')
      .send({
        name: 'valid_name',
        password: 'valid_password',
        email: 'valid_emailmail.com',
      })
      .expect(400)
      .end(done);
  });

  it('deve retornar um status 201 todas informações forem enviadas corretamente', (done) => {
    request(app)
      .post('/user')
      .send({
        name: 'valid_name',
        password: 'valid_password',
        email: 'valid_email@mail.com',
      })
      .expect(201)
      .end(done);
  });
});
