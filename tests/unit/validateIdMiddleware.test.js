const sinon = require('sinon');
const { validateIdMiddleware } = require('../../src/middlewares');

describe('Middleware validateIdMiddleware', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 quando o campo id não for informado', () => {
    req.body = {};
    validateIdMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Id não informado." } quando o campo id não for informado', () => {
    req.body = {};
    validateIdMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Id não informado.' })).toBe(true);
  });

  it('deve retornar um status 400 quando o campo id estiver vazio', () => {
    req.body.id = '';
    validateIdMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Id não informado." } quando o campo id estiver vazio', () => {
    req.body.id = '';
    validateIdMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Id não informado.' })).toBe(true);
  });

  it('deve retornar a função next caso nome informado estiver correto', () => {
    req.body.id = 'invalid@mail.com';
    validateIdMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
