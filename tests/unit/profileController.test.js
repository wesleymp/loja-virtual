const sinon = require('sinon');
const controllers = require('../../src/controllers');
const services = require('../../src/services');
const profile = require('../memory-data/profile');
const { genereteJwt } = require('../../src/util/jwt');

describe('Controller profileController', () => {
  const req = {};
  const res = {};
  const next = sinon.stub();
  const token = genereteJwt({ id_user: 2, id_role: 2 });

  beforeAll(() => {
    req.headers = token;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 200 caso a autenticação estiver correta', async () => {
    sinon.stub(services, 'profileService').resolves({ status: 200, data: profile });
    await controllers.profileController(req, res, next);
    expect(res.status.calledWith(200)).toBe(true);
  });

  it('deve retornar um json com os dados do usuário caso a autenticação estiver correta', async () => {
    sinon.stub(services, 'profileService').resolves({ status: 200, data: profile });
    await controllers.profileController(req, res, next);
    expect(res.json.calledWith({ data: profile })).toBe(true);
  });

  it('deve retornar a função next caso a autenticação não estiver correta', async () => {
    req.headers = 'invalid_token';
    sinon.stub(services, 'profileService').rejects({ status: 404, message: 'Nenhum usuário cadastrado' });
    await controllers.profileController(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
