const sinon = require('sinon');
const { postUserController } = require('../../src/controllers');
const services = require('../../src/services');

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

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar a função next quando for enviado um email que já existe', async () => {
    sinon.stub(services, 'postUserService').rejects(true);
    await postUserController(req, res, next);
    sinon.assert.calledOnce(next);
  });

  it('deve retornar um status 201 caso o registro for efetuado com sucesso', async () => {
    sinon.stub(services, 'postUserService').resolves({ status: 201, message: 'Usuário registrado com sucesso!' });
    await postUserController(req, res, next);
    expect(res.status.calledWith(201)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Usuário registrado com sucesso!" } caso o registro for efetuado com sucesso', async () => {
    sinon.stub(services, 'postUserService').resolves({ status: 201, message: 'Usuário registrado com sucesso!' });
    await postUserController(req, res, next);
    expect(res.json.calledWith({ message: 'Usuário registrado com sucesso!' })).toBe(true);
  });
});
