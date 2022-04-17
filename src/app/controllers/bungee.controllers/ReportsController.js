import { Op } from 'sequelize';

import Reports from '../../models/bungee.models/Reports';
import ReportsComments from '../../models/bungee.models/ReportsComments';
import ReportsUsers from '../../models/bungee.models/ReportsUsers';

class ReportsController {
  async getall(req, res) {
    try {
      const getReports = await Reports.findAll({
        include: [
          {
            model: ReportsUsers,
            as: 'reported',
          },
          {
            model: ReportsUsers,
            as: 'reporter',
          },
          {
            model: ReportsComments,
            as: 'comments',
            include: [
              {
                model: ReportsUsers,
                as: 'user',
              },
            ],
          },
        ],
      });

      return res.json(getReports);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async getByID(req, res) {
    const { id } = req.params;
    try {
      const getReports = await Reports.findOne({
        where: { report_id: id },
        include: [
          {
            model: ReportsUsers,
            as: 'reported',
          },
          {
            model: ReportsUsers,
            as: 'reporter',
          },
          {
            model: ReportsComments,
            as: 'comments',
            include: [
              {
                model: ReportsUsers,
                as: 'user',
              },
            ],
          },
        ],
      });

      if (!getReports) {
        return res.status(404).json({ error: 'Report não encontrado.' });
      }

      return res.json(getReports);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async getUserByUUID(req, res) {
    try {
      const { uuid } = req.params;

      const user = await ReportsUsers.findByPk(uuid);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }
}

export default new ReportsController();
