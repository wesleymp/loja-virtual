const sinon = require('sinon');
const controllers = require('../../src/controllers');
const services = require('../../src/services');
const products = require('../memory-data/products');

describe('Controller getProductController', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeAll(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 200 caso existir produtos cadastrados', async () => {
    sinon.stub(services, 'getProductService').resolves({ status: 200, data: products });
    await controllers.getProductController(req, res, next);
    expect(res.status.calledWith(200)).toBe(true);
  });

  it('deve retornar um json com os dados do produto caso existir produtos cadastrados', async () => {
    sinon.stub(services, 'getProductService').resolves({ status: 200, data: products });
    await controllers.getProductController(req, res, next);
    expect(res.json.calledWith({ data: products })).toBe(true);
  });

  it('deve retornar a função next caso não existir produtos cadastrados', async () => {
    sinon.stub(services, 'getProductService').rejects({ status: 404, message: 'Nenhum produto cadastrado' });
    await controllers.getProductController(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
