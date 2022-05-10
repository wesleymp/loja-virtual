const sinon = require('sinon');
const { validateQuantityMiddleware } = require('../../src/middlewares');

describe('Middleware validateQuantityMiddleware', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 quando o campo quantidade não for informado', () => {
    req.body = {};
    validateQuantityMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Quantidade não informado." } quando o campo quantidade não for informado', () => {
    req.body = {};
    validateQuantityMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Quantidade não informado.' })).toBe(true);
  });

  it('deve retornar um status 400 quando o campo quantidade estiver vazio', () => {
    req.body.quantity = '';
    validateQuantityMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Quantidade não informado." } quando o campo quantidade estiver vazio', () => {
    req.body.quantity = '';
    validateQuantityMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Quantidade não informado.' })).toBe(true);
  });

  it('deve retornar a função next caso quantidade informada estiver correto', () => {
    req.body.quantity = 'invalid@mail.com';
    validateQuantityMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
