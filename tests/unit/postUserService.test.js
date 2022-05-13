const sinon = require('sinon');
const services = require('../../src/services');
const models = require('../../src/models');

describe('Service checkEmail', () => {
  const req = {};

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      password: 'valid_password',
      email: 'valid_email@mail.com',
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 400 se o email informado já estiver cadastrado', async () => {
    sinon.stub(models, 'getUserModel').resolves([1, 2, 3]);
    try {
      await services.checkEmail(req.body.email);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('deve retornar uma mensagem "Email já está em uso." se o email informado já estiver cadastrado', async () => {
    sinon.stub(models, 'getUserModel').resolves([1, 2, 3]);
    try {
      await services.checkEmail(req.body.email);
    } catch (error) {
      expect(error.message).toBe('Email já está em uso.');
    }
  });
});

describe('Service postUserService', () => {
  const req = {};

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      password: 'valid_password',
      email: 'valid_email@mail.com',
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 201 se os dados de registros forem informados corretamente', async () => {
    sinon.stub(models, 'getUserModel').resolves([]);
    sinon.stub(models, 'postUserModel').resolves(true);
    const dataRegister = await services.postUserService(
      req.body.name,
      req.body.password,
      req.body.email,
    );
    expect(dataRegister.status).toBe(201);
  });

  it('deve retornar um objeto que contenha as chaves status e message se os dados de registros forem informados corretamente', async () => {
    sinon.stub(models, 'getUserModel').resolves([]);
    sinon.stub(models, 'postUserModel').resolves(true);
    const dataRegister = await services.postUserService(
      req.body.name,
      req.body.password,
      req.body.email,
    );
    expect(dataRegister).toHaveProperty('status');
    expect(dataRegister).toHaveProperty('message');
  });
});
