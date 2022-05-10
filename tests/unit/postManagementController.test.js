const sinon = require('sinon');
const controllers = require('../../src/controllers');
const services = require('../../src/services');

describe('Controller postManagementController', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeAll(() => {
    req.body = {
      id: 2,
      quantity: 20.00,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 201 caso o registro da moeda for efetuado com sucesso', async () => {
    sinon.stub(services, 'postManagementService').resolves({ status: 201, message: 'Moeda adicionada com sucesso!' });
    await controllers.postManagementController(req, res, next);
    expect(res.status.calledWith(201)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Moeda adicionada com sucesso!" } caso o registro da moeda for efetuado com sucesso', async () => {
    sinon.stub(services, 'postManagementService').resolves({ status: 201, message: 'Moeda adicionada com sucesso!' });
    await controllers.postManagementController(req, res, next);
    expect(res.json.calledWith({ message: 'Moeda adicionada com sucesso!' })).toBe(true);
  });
});
