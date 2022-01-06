import Configuracoes from '../models/Configuracoes';
import Roles from '../models/Roles';
import UserRoles from '../models/UserRoles';
import Usuario from '../models/Usuario';

export default async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    const roles = await Roles.findOne({ where: { nome: 'BYPASS' } });
    const userRoles = await UserRoles.findOne({
      where: { role_id: roles.id },
    });

    const config = await Configuracoes.findOne({
      where: {
        manutencao: true,
      },
    });

    if (!config) {
      console.log('Log1');
      return next();
    }

    if (!user) {
      console.log('Log2');

      return res.status(503).json({
        title: 'CubeBoxAPI',
        version: `${process.env.VERSION}`,
        status: '503 - Maintenance',
        message: 'Sistema em manutenção.',
      });
    }

    if (!userRoles) {
      console.log('Log3');

      return res.status(503).json({
        title: 'CubeBoxAPI',
        version: `${process.env.VERSION}`,
        status: '503 - Maintenance',
        message: 'Sistema em manutenção.',
      });
    }

    if (user.nivel !== 'ADMIN') {
      console.log('Log4');

      return res.status(503).json({
        title: 'CubeBoxAPI',
        version: `${process.env.VERSION}`,
        status: '503 - Maintenance',
        message: 'Sistema em manutenção.',
      });
    }

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Ocorreu um erro ao verificar manutenção.',
      message: e.message,
    });
  }
};
