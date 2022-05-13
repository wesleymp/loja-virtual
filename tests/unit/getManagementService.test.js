const sinon = require('sinon');
const services = require('../../src/services');
const models = require('../../src/models');
const users = require('../memory-data/users');
require('dotenv').config();

describe('Service getManagementService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 200 caso existir usuários cadastrados', async () => {
    sinon.stub(models, 'getManagementModel').resolves(users);
    const dataRegister = await services.getManagementService();
    expect(dataRegister.status).toBe(200);
  });

  it('deve retornar um json com os dados do usuário caso existir usuários cadastrados', async () => {
    sinon.stub(models, 'getManagementModel').resolves(users);
    const dataRegister = await services.getManagementService();
    expect(dataRegister.data).toMatchObject(users);
  });

  it('deve retornar um status code 404 caso não existir usuários cadastrados', async () => {
    sinon.stub(models, 'getManagementModel').resolves([]);
    try {
      await services.getManagementService();
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  it('deve retornar uma mensagem { message: "Nenhum usuário cadastrado" } caso não existir usuários cadastrados', async () => {
    sinon.stub(models, 'getManagementModel').resolves([]);
    try {
      await services.getManagementService();
    } catch (error) {
      expect(error).toMatchObject({ message: 'Nenhum usuário cadastrado' });
    }
  });
});
