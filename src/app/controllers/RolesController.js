import Roles from '../models/Roles';
import Uploads from '../models/Uploads';
import UserRoles from '../models/UserRoles';
import Usuario from '../models/Usuario';

class RolesController {
  async giveRoleUser(req, res) {
    const { email, permissao } = req.body;
    try {
      const permissaoCAPS = permissao.toUpperCase();

      const checkUser = await Usuario.findByPk(req.userId);

      if (!checkUser) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const checkRole = await Roles.findOne({ where: { nome: permissaoCAPS } });

      if (!checkRole) {
        return res.status(404).json({ error: 'Permissão não encontrada.' });
      }

      const getUser = await Usuario.findOne({ where: { email } });

      if (!getUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const getUserRoles = await UserRoles.findOne({
        where: { user_id: getUser.id, role_id: checkRole.id },
      });

      if (getUserRoles) {
        return res
          .status(400)
          .json({ error: 'Usuário já possuí essa permissão.' });
      }

      const create = await UserRoles.create({
        user_id: getUser.id,
        role_id: checkRole.id,
        created_by: req.userId,
      });

      return res.json(create);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível dar a permissão ao usuário.',
        message: e.message,
      });
    }
  }

  async removeRoleUser(req, res) {
    const { email, permissao } = req.body;
    try {
      const isAdmin = await Usuario.findByPk(req.userId);

      if (!isAdmin) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (isAdmin.nivel !== 'ADMIN') {
        res
          .status(401)
          .json({ error: 'Você não tem permissão para fazer isso.' });
      }

      const nome = permissao.toUpperCase();

      const searchUser = await Usuario.findOne({ where: { email } });

      if (!searchUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const searchRole = await Roles.findOne({ where: { nome } });

      if (!searchRole) {
        return res.status(404).json({ error: 'Permissão não encontrada.' });
      }

      const checkUserRole = await UserRoles.findOne({
        where: { user_id: searchUser.id },
      });

      if (!checkUserRole) {
        return res
          .status(400)
          .json({ error: 'Esse usuário não possuí nenhuma permissão.' });
      }

      if (checkUserRole) {
        if (searchRole.id !== checkUserRole.role_id) {
          return res
            .status(400)
            .json({ error: 'Esse usuário não possuí esta permissão.' });
        }
      }

      await UserRoles.destroy({
        where: { id: checkUserRole.id },
      });
      return res.json({ sucess: `Permissão '${nome}' removida com sucesso!` });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao remover uma permissão.',
        message: e.message,
      });
    }
  }

  async getAllRoles(req, res) {
    try {
      const roles = await Roles.findAll();
      res.json(roles);
    } catch (e) {
      res.status(400).json({
        error: 'Não foi possível listar as permissões.',
        message: e.message,
      });
    }
  }

  async getUserRoleSearch(req, res) {
    try {
      const getUser = await Usuario.findByPk(req.userId);
      if (getUser.nivel !== 'ADMIN') {
        return res
          .status(401)
          .json({ error: 'Você não tem permissão para fazer isso.' });
      }
      const userEmail = req.query.email;
      const searchUser = await Usuario.findOne({ where: { email: userEmail } });

      if (!searchUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const userRoles = await UserRoles.findAll({
        where: { user_id: searchUser.id },
        include: [
          { model: Roles, as: 'role', attributes: ['nome', 'id'] },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['nome', 'id', 'email'],
            include: [
              {
                model: Uploads,
                as: 'avatar',
                attributes: ['id', 'url', 'tipo', 'path'],
              },
            ],
          },
        ],
        attributes: [],
      });

      return res.json({
        permissoes: userRoles,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar as permissões.',
        message: e.message,
      });
    }
  }

  async getUserRoles(req, res) {
    try {
      const userRoles = await UserRoles.findAll({
        where: { user_id: req.userId },
        include: [{ model: Roles, as: 'role', attributes: ['nome', 'id'] }],
        attributes: [],
      });

      return res.json({
        permissoes: userRoles,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar as permissões.',
        message: e.message,
      });
    }
  }
}

export default new RolesController();
