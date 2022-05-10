const sinon = require('sinon');
const { adminMiddleware } = require('../../src/middlewares');
const { genereteJwt } = require('../../src/util/jwt');

describe('Middleware adminMiddleware', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();
  const token = genereteJwt({ id: 1, id_role: 1 });

  beforeAll(() => {
    req.headers = {
      authorization: genereteJwt({ id: 2, id_role: 2 }),
    };
  });

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 403 quando o usuário não for admin', () => {
    adminMiddleware(req, res, next);
    expect(res.status.calledWith(403)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Você não tem permissão para acessar está rota." } quando o usuário não for admin', () => {
    adminMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Você não tem permissão para acessar está rota.' })).toBe(true);
  });

  it('deve retornar a função next quando o usuário for um admin', () => {
    req.headers = { authorization: token };
    adminMiddleware(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
