const sinon = require('sinon');
const { validateEmailMiddleware } = require('../../src/middlewares');

describe('Middleware validateEmailMiddleware', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 quando o campo email não for informado', () => {
    req.body = {};
    validateEmailMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Email não informado." } quando o campo email não for informado', () => {
    req.body = {};
    validateEmailMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Email não informado.' })).toBe(true);
  });

  it('deve retornar um status 400 quando o campo email estiver vazio', () => {
    req.body.email = '';
    validateEmailMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Email não informado." } quando o campo email estiver vazio', () => {
    req.body.email = '';
    validateEmailMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Email não informado.' })).toBe(true);
  });

  it('deve retornar um status 400 quando o email informado estiver incorreto', () => {
    req.body.email = 'invalidmail.com';
    validateEmailMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Email inválido." } quando o email informado estiver incorreto', () => {
    req.body.email = 'invalidmail.com';
    validateEmailMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Email inválido.' })).toBe(true);
  });

  it('deve retornar a função next caso nome informado estiver correto', () => {
    req.body.email = 'invalid@mail.com';
    validateEmailMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
