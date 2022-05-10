const sinon = require('sinon');
const controllers = require('../../src/controllers');
const services = require('../../src/services');

describe('Controller postProductController', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      price: 20.00,
    };
    req.file = {
      filename: '',
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 201 caso o registro do produto for efetuado com sucesso', async () => {
    sinon.stub(services, 'postProductService').resolves({ status: 201, message: 'Usuário registrado com sucesso!' });
    await controllers.postProductController(req, res, next);
    expect(res.status.calledWith(201)).toBe(true);
  });

  it('deve retornar uma mensagem { message: "Produto adicionado com sucesso!" } caso o registro do produto for efetuado com sucesso', async () => {
    sinon.stub(services, 'postProductService').resolves({ status: 201, message: 'Produto adicionado com sucesso!' });
    await controllers.postProductController(req, res, next);
    expect(res.json.calledWith({ message: 'Produto adicionado com sucesso!' })).toBe(true);
  });
});
