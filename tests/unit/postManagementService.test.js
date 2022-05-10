const sinon = require('sinon');
const services = require('../../src/services');
const models = require('../../src/models');
require('dotenv').config();

describe('Service postManagementService', () => {
  const id = 2;
  const quantity = 20.00;

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 201 se a moeda for registrada corretamente', async () => {
    sinon.stub(models, 'postManagementModel').resolves(true);
    const dataRegister = await services.postManagementService(id, quantity);
    expect(dataRegister.status).toBe(201);
  });

  it('deve retornar um objeto que contenha as chaves status e message se a moeda for registrada corretamente', async () => {
    sinon.stub(models, 'postManagementModel').resolves(true);
    const dataRegister = await services.postManagementService(id, quantity);
    expect(dataRegister).toHaveProperty('status');
    expect(dataRegister).toHaveProperty('message');
  });
});
