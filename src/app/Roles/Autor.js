import Roles from '../models/Roles';
import UserRoles from '../models/UserRoles';
import Usuario from '../models/Usuario';

export default async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    const roles = await Roles.findOne({ where: { nome: 'AUTOR' } });
    const userRoles = await UserRoles.findOne({
      where: { role_id: roles.id },
    });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    if (user.nivel === 'ADMIN') {
      return next();
    }

    if (!userRoles) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para acessar essa página.' });
    }

    if (userRoles.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para acessar essa página.' });
    }

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Ocorreu um erro nas permissões.', message: e.message });
  }
};
