const sinon = require('sinon');
const { validateNameMiddleware } = require('../../src/middlewares');

describe('Middleware validateNameMiddleware', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 quando o campo nome não for informado', () => {
    req.body = {};
    validateNameMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Nome não informado." } quando o campo nome não for informado', () => {
    req.body = {};
    validateNameMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Nome não informado.' })).toBe(true);
  });

  it('deve retornar um status 400 quando o campo nome estiver vazio', () => {
    req.body.name = '';
    validateNameMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Nome não informado." } quando o campo nome estiver vazio', () => {
    req.body.name = '';
    validateNameMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Nome não informado.' })).toBe(true);
  });

  it('deve retornar um status 400 quando o nome for menor que 2 caracteres', () => {
    req.body.name = '1';
    validateNameMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Nome deve conter pelo menos 2 caracteres." } quando o nome for menor que 2 caracteres', () => {
    req.body.name = '1';
    validateNameMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Nome deve conter pelo menos 2 caracteres.' })).toBe(true);
  });

  it('deve retornar a função next caso nome informado estiver correto', () => {
    req.body.name = 'valid_username';
    validateNameMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
