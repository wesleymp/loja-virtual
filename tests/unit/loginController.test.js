const sinon = require('sinon');
const { loginController } = require('../../src/controllers');
const { connection } = require('../../src/models/connection');
const { crypt } = require('../../src/services/helpers/bcrypt');
const { genereteJwt } = require('../../src/util/jwt');
const { getUserModel } = require('../../src/models');

describe('Controller loginController', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

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

  it('deve retornar a função next quando for enviado um email que não existe', async () => {
    req.body = {
      name: 'invalid_name',
      password: 'invalid_password',
      email: 'invalid_email@mail.com',
    };
    await loginController(req, res, next);
    sinon.assert.calledOnce(next);
  });

  it('deve retornar um status 200 caso o login for efetuado com sucesso', async () => {
    req.body = {
      name: 'valid_name',
      password: 'valid_password',
      email: 'valid_email@mail.com',
    };
    await loginController(req, res, next);
    expect(res.status.calledWith(200)).toBe(true);
  });

  it('deve retornar um token caso o login for efetuado com sucesso', async () => {
    const { rows } = await getUserModel(req.body.email);
    await loginController(req, res, next);
    expect(
      res
        .json
        .calledWith({ token: genereteJwt({ id: rows[0].id, id_role: rows[0].id_role }) }),
    ).toBe(true);
  });
});
