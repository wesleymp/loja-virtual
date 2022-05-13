const sinon = require('sinon');
const services = require('../../src/services');
const models = require('../../src/models');
const products = require('../memory-data/products');
require('dotenv').config();

describe('Service getProductService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 200 caso existir produtos cadastrados', async () => {
    sinon.stub(models, 'getProductModel').resolves(products);
    const dataRegister = await services.getProductService();
    expect(dataRegister.status).toBe(200);
  });

  it('deve retornar um json com os dados do produto caso existir produtos cadastrados', async () => {
    sinon.stub(models, 'getProductModel').resolves(products);
    const dataRegister = await services.getProductService();
    expect(dataRegister.data).toMatchObject(products);
  });

  it('deve retornar um status code 404 caso não existir produtos cadastrados', async () => {
    sinon.stub(models, 'getProductModel').resolves([]);
    try {
      await services.getProductService();
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  it('deve retornar uma mensagem { message: "Nenhum produto cadastrado" } caso não existir produtos cadastrados', async () => {
    sinon.stub(models, 'getProductModel').resolves([]);
    try {
      await services.getProductService();
    } catch (error) {
      expect(error).toMatchObject({ message: 'Nenhum produto cadastrado' });
    }
  });
});
