const sinon = require('sinon');
const { authMiddleware } = require('../../src/middlewares');
const { genereteJwt } = require('../../src/util/jwt');

describe('Middleware authMiddleware', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();
  const token = genereteJwt({ id: 2, id_role: 2 });

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 401 quando não existir o cabeçalho authorization', () => {
    req.headers = {};
    authMiddleware(req, res, next);
    expect(res.status.calledWith(401)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Token não encontrado." } quando não existir o cabeçalho authorization', () => {
    req.headers = {};
    authMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Token não encontrado.' })).toBe(true);
  });

  it('deve retornar um status 401 quando for enviado um token inválido', () => {
    req.headers = { authorization: 'invalid_token' };
    authMiddleware(req, res, next);
    expect(res.status.calledWith(401)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Token inválido." } quando for enviado um token inválido', () => {
    req.headers = { authorization: 'invalid_token' };
    authMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Token inválido.' })).toBe(true);
  });

  it('deve retornar a função next caso o token informado estiver correto', () => {
    req.headers = { authorization: token };
    authMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
