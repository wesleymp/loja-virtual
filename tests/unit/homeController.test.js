const sinon = require('sinon');
const controllers = require('../../src/controllers');

describe('Controller homeController', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeAll(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 200 ao acessar a rota /', async () => {
    await controllers.homeController(req, res, next);
    expect(res.status.calledWith(200)).toBe(true);
  });

  it('deve retornar uma messagem { message: "OK" } ao acessar a rota /', async () => {
    await controllers.homeController(req, res, next);
    expect(res.json.calledWith({ message: 'OK' })).toBe(true);
  });
});
