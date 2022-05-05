const { loginService } = require('../../src/services');
const { connection } = require('../../src/models/connection');
const { crypt } = require('../../src/services/helpers/bcrypt');

describe('Service loginService', () => {
  const req = {};

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      password: 'valid_password',
      email: 'valid_email@mail.com',
    };
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

  it('deve retornar um status code 400 se o email já existir', async () => {
    try {
      await loginService(req.body.email, req.body.password);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('deve retornar um status code 400 se a senha for incorreta', async () => {
    req.body.email = 'valid_email_2@mail.com';
    req.body.password = 'invalid_password';
    try {
      await loginService(req.body.email, req.body.password);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('deve retornar um objeto que contenha as chaves status e token caso o login for efetuado com sucesso', async () => {
    req.body.password = 'valid_password';
    req.body.email = 'valid_email@mail.com';
    const dataRegister = loginService(req.body.email, req.body.password);
    expect((await dataRegister)).toHaveProperty('status');
    expect((await dataRegister)).toHaveProperty('token');
  });
});
