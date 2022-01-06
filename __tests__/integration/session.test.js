import truncate from '../util/truncate';
import Usuario from '../../src/app/models/Usuario';

describe('Auth', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve se autenticar', async () => {
    const user = await Usuario.create({
      nome: 'Henrique',
      email: 'almeida89henrique@gmail.com',
      senha_hash: '123123',
    });

    expect(user.email).toBe('almeida89henrique@gmail.com');
  });
});
