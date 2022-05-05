const sinon = require('sinon');
const { postUserService, checkEmail } = require('../../src/services');
const { connection } = require('../../src/models/connection');
const { crypt } = require('../../src/services/helpers/bcrypt');

describe('Service checkEmail', () => {
  const req = {};
  const res = {};

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      password: 'valid_password',
      email: 'valid_email@mail.com',
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  beforeAll(async () => {
    (await connection.connect()).query(
      'INSERT INTO "user" (name, password, email) VALUES ($1, $2, $3)',
      [req.body.name, crypt(req.body.password), req.body.email],
    );
  });

  afterAll(async () => {
    (await connection.connect()).query('DELETE FROM "user" WHERE email != $1', ['admin@mail.com']);
  });

  it('deve retornar um status code 400 se o email informado já estiver cadastrado', async () => {
    try {
      await checkEmail(req.body.email);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('deve retornar uma mensagem "Email já está em uso." se o email informado já estiver cadastrado', async () => {
    try {
      await checkEmail(req.body.email);
    } catch (error) {
      expect(error.message).toBe('Email já está em uso.');
    }
  });
});

describe('Service postUserService', () => {
  const req = {};
  const res = {};

  beforeAll(() => {
    req.body = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterAll(async () => {
    (await connection.connect()).query('DELETE FROM "user" WHERE email != $1', ['admin@mail.com']);
  });

  it('deve retornar um status code 201 se os dados de registros forem informados corretamente', async () => {
    req.body.name = 'valid_name_1';
    req.body.password = 'valid_password_1';
    req.body.email = 'valid_email_1@mail.com';
    const dataRegister = postUserService(req.body.name, crypt(req.body.password), req.body.email);
    expect((await dataRegister).status).toBe(201);
  });

  it('deve retornar um objeto que contenha as chaves status e message se os dados de registros forem informados corretamente', async () => {
    req.body.name = 'valid_name_2';
    req.body.password = 'valid_password_2';
    req.body.email = 'valid_email_2@mail.com';
    const dataRegister = postUserService(req.body.name, crypt(req.body.password), req.body.email);
    expect((await dataRegister)).toHaveProperty('status');
    expect((await dataRegister)).toHaveProperty('message');
  });
});
