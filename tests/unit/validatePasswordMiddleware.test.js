const sinon = require('sinon');
const { validatePasswordMiddleware } = require('../../src/middlewares');

describe('Middleware validatePasswordMiddleware', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 quando o campo senha não for informado', () => {
    req.body = {};
    validatePasswordMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Senha não informada." } quando o campo senha não for informada', () => {
    req.body = {};
    validatePasswordMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Senha não informada.' })).toBe(true);
  });

  it('deve retornar um status 400 quando o campo senha estiver vazio', () => {
    req.body.password = '';
    validatePasswordMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Senha não informada." } quando o campo senha estiver vazio', () => {
    req.body.password = '';
    validatePasswordMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Senha não informada.' })).toBe(true);
  });

  it('deve retornar um status 400 quando a senha for menor que 6 caracteres', () => {
    req.body.password = '12345';
    validatePasswordMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Senha deve conter pelo menos 6 caracteres." } quando a senha for menor que 6 caracteres', () => {
    req.body.password = '12345';
    validatePasswordMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Senha deve conter pelo menos 6 caracteres.' })).toBe(true);
  });

  it('deve retornar a função next caso a senha informada estiver correto', () => {
    req.body.password = 'valid_password';
    validatePasswordMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
