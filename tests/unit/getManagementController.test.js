const sinon = require('sinon');
const controllers = require('../../src/controllers');
const services = require('../../src/services');
const users = require('../memory-data/users');

describe('Controller getManagementController', () => {
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

  it('deve retornar um status 200 caso existir usuários cadastrados', async () => {
    sinon.stub(services, 'getManagementService').resolves({ status: 200, data: users });
    await controllers.getManagementController(req, res, next);
    expect(res.status.calledWith(200)).toBe(true);
  });

  it('deve retornar um json com os dados do usuário caso existir usuários cadastrados', async () => {
    sinon.stub(services, 'getManagementService').resolves({ status: 200, data: users });
    await controllers.getManagementController(req, res, next);
    expect(res.json.calledWith({ data: users })).toBe(true);
  });

  it('deve retornar a função next caso não existir usuários cadastrados', async () => {
    sinon.stub(services, 'getManagementService').rejects({ status: 404, message: 'Nenhum usuário cadastrado' });
    await controllers.getManagementController(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
