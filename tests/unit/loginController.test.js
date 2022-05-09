const sinon = require('sinon');
const { loginController } = require('../../src/controllers');
const services = require('../../src/services');

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

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar a função next quando for enviado um email que não existe', async () => {
    sinon.stub(services, 'loginService').rejects({ status: 200, token: 'valid_token' });
    await loginController(req, res, next);
    sinon.assert.calledOnce(next);
  });

  it('deve retornar um status 200 caso o login for efetuado com sucesso', async () => {
    sinon.stub(services, 'loginService').resolves({ status: 200, token: 'valid_token' });
    await loginController(req, res, next);
    expect(res.status.calledWith(200)).toBe(true);
  });

  it('deve retornar um token caso o login for efetuado com sucesso', async () => {
    sinon.stub(services, 'loginService').resolves({ status: 200, token: 'valid_token' });
    await loginController(req, res, next);
    expect(res.json.calledWith({ token: 'valid_token' })).toBe(true);
  });
});
