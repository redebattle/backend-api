import { Op } from 'sequelize';

import Banimentos from '../models/Banimentos';
import HistoricoBanimentos from '../models/HistoricoBanimentos';

class BanimentosController {
  async getall(req, res) {
    try {
      // const getHistory = await HistoricoBanimentos.findAll();
      // const get1 = JSON.parse(JSON.stringify(getHistory));
      const getBans = await Banimentos.findAll({
        include: [
          {
            model: HistoricoBanimentos,
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

  async checkBan(req, res) {
    const { username } = req.params;
    const user = username.toLowerCase();

    try {
      const isExist = await HistoricoBanimentos.findOne({
        where: {
          name: user,
        },
      });

      if (!isExist) {
        return res.status(404).json({
          error: `Nenhuma punição para ${user} foi encontrada.`,
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
        username,
        avatar: `https://minotar.net/armor/bust/${username}`,
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
