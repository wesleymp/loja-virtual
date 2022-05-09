const sinon = require('sinon');
const { loginService } = require('../../src/services');
const { crypt } = require('../../src/services/helpers/bcrypt');
const models = require('../../src/models');

describe('Service loginService', () => {
  const req = {};

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      password: 'valid_password',
      email: 'valid_email@mail.com',
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 400 se o email já existir', async () => {
    sinon.stub(models, 'getUserModel').resolves({ rowCount: 0 });
    try {
      await loginService(req.body.email, req.body.password);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('deve retornar um status code 400 se a senha for incorreta', async () => {
    sinon.stub(models, 'getUserModel').resolves({ rowCount: 0 });
    try {
      await loginService(req.body.email, req.body.password);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('deve retornar um objeto que contenha as chaves status e token caso o login for efetuado com sucesso', async () => {
    const dataModels = {
      id: 1,
      name: 'valid_name',
      password: crypt('valid_password'),
      email: 'valid_email@mail.com',
    };
    sinon.stub(models, 'getUserModel').resolves({ rows: [dataModels], rowCount: 1 });
    const dataRegister = await loginService(req.body.email, req.body.password);
    expect(dataRegister).toHaveProperty('status');
    expect(dataRegister).toHaveProperty('token');
  });
});
