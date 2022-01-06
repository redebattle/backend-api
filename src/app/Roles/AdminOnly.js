import Usuario from '../models/Usuario';

export default async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    if (user.nivel !== 'ADMIN') {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para acessar essa página.' });
    }

    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ error: 'Ocorreu um erro.', message: e.message });
  }
};
