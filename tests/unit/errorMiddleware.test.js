const sinon = require('sinon');
const { errorMiddleware } = require('../../src/middlewares');

describe('Middleware errorMiddleware', () => {
  const err = {};
  const req = {};
  const res = {};
  const next = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status diferente de 500', () => {
    err.status = 400;
    err.message = 'Bad Request';
    errorMiddleware(err, req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Bad Request" }', () => {
    err.status = 400;
    err.message = 'Bad Request';
    errorMiddleware(err, req, res, next);
    expect(res.json.calledWith({ message: 'Bad Request' })).toBe(true);
  });

  it('deve retornar um status 500', () => {
    err.status = 0;
    err.message = 'Internal error.';
    errorMiddleware(err, req, res, next);
    expect(res.status.calledWith(500)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Internal error." }', () => {
    err.status = 0;
    err.message = 'Internal error.';
    errorMiddleware(err, req, res, next);
    expect(res.json.calledWith({ message: 'Internal error.' })).toBe(true);
  });
});
