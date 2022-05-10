const sinon = require('sinon');
const services = require('../../src/services');
const models = require('../../src/models');
require('dotenv').config();

describe('Service postProductService', () => {
  const name = 'valid_name';
  const price = 20.00;
  const filename = `${process.env.BASE_URL}/images/products/valid_image.png`;

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 201 se o produto registrado corretamente', async () => {
    sinon.stub(models, 'postProductModel').resolves(true);
    const dataRegister = await services.postProductService(name, price, filename);
    expect(dataRegister.status).toBe(201);
  });

  it('deve retornar um objeto que contenha as chaves status e message se o produto registrado corretamente', async () => {
    sinon.stub(models, 'postProductModel').resolves(true);
    const dataRegister = await services.postProductService(name, price, filename);
    expect(dataRegister).toHaveProperty('status');
    expect(dataRegister).toHaveProperty('message');
  });
});
