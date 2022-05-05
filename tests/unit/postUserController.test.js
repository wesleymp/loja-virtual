const sinon = require('sinon');
const { postUserController } = require('../../src/controllers');
const { connection } = require('../../src/models/connection');
const { crypt } = require('../../src/services/helpers/bcrypt');

describe('Controller postUserController', () => {
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

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar a função next quando for enviado um email que já existe', async () => {
    await postUserController(req, res, next);
    sinon.assert.calledOnce(next);
  });

  it('deve retornar um status 201 caso o registro for efetuado com sucesso', async () => {
    req.body.email = 'valid_1_email@mail.com.br';
    await postUserController(req, res, next);
    expect(res.status.calledWith(201)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Usuário registrado com sucesso!" } caso o registro for efetuado com sucesso', async () => {
    req.body.email = 'valid_2_email@mail.com';
    await postUserController(req, res, next);
    expect(res.json.calledWith({ message: 'Usuário registrado com sucesso!' })).toBe(true);
  });
});
