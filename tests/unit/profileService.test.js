const sinon = require('sinon');
const services = require('../../src/services');
const models = require('../../src/models');
const profile = require('../memory-data/profile');
const { genereteJwt } = require('../../src/util/jwt');
require('dotenv').config();

describe('Service profileService', () => {
  const token = genereteJwt({ id_user: 2, id_role: 2 });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status code 200 caso a autenticação estiver correta', async () => {
    sinon.stub(models, 'profileModel').resolves([profile]);
    const dataRegister = await services.profileService(token);
    expect(dataRegister.status).toBe(200);
  });

  it('deve retornar um json com os dados do usuário caso a autenticação estiver correta', async () => {
    sinon.stub(models, 'profileModel').resolves([profile]);
    const dataRegister = await services.profileService(token);
    expect(dataRegister.data).toMatchObject(profile);
  });
});
