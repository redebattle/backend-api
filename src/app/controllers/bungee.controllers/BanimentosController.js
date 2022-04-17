import { Op } from 'sequelize';

import Banimentos from '../../models/bungee.models/Banimentos';
import HistoricoBanimentos from '../../models/bungee.models/HistoricoBanimentos';

class BanimentosController {
  async getall(req, res) {
    try {
      const getBans = await Banimentos.findAll({
        include: [
          {
            model: HistoricoBanimentos,
            as: 'user',
          },
        ],
        order: [['id', 'desc']],
      });

      return res.json(getBans);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async getByID(req, res) {
    try {
      const { id } = req.params;
      const getBans = await Banimentos.findOne({
        where: { id },
        include: [
          {
            model: HistoricoBanimentos,
            as: 'user',
          },
        ],
        order: [['id', 'desc']],
      });

      // if (!getBans) {
      //   return res.status(404).json({ error: 'Punição não encontrada.' });
      // }

      return res.json(getBans);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async checkBan(req, res) {
    const { user } = req.params;

    try {
      const isExist = await HistoricoBanimentos.findOne({
        where: {
          name: user,
        },
      });

      if (!isExist) {
        return res.json({
          punicoes: [],
          user: { erro: 'Usuário não encontrado.' },
        });
      }

      const { uuid } = await HistoricoBanimentos.findOne({
        where: {
          name: user,
        },
      });

      const punicoes = await Banimentos.findAll({
        where: {
          uuid: [uuid],
        },
      });

      return res.json({
        punicoes,
        user: isExist,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async getStatistic(req, res) {
    try {
      const getTotalBans = await Banimentos.count();
      const getUsersBans = await HistoricoBanimentos.count();

      return res.json({ total: getTotalBans, usuarios: getUsersBans });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }
}

export default new BanimentosController();
