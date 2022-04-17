import Medals from '../models/Medals';
import MedalsCategories from '../models/MedalsCategories';
import MedalUser from '../models/MedalsUsers';
import Users from '../models/Users';

class MedalsController {
  async getUserMedals(req, res) {
    const { username } = req.params;
    try {
      const getUser = await Users.findOne({
        where: { username },
      });

      if (!getUser) {
        return res.status(404).json({
          status: 404,
          error: true,
          message: `Usuário ${req.params.username} não encontrado.`,
        });
      }

      const getMedalsUser = await MedalUser.findAll({
        where: { user_id: getUser.id },
        attributes: {
          exclude: ['medal_id'],
        },
        include: [
          {
            model: Medals,
            as: 'medal',
            attributes: [
              'id',
              'name',
              'description',
              'image',
              'category_id',
              'position',
            ],
          },
        ],
      });
      return res.json(getMedalsUser);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Não foi possível listar os registros.',
        details: e.message,
      });
    }
  }

  async getAllMedals(req, res) {
    try {
      const getMedals = await Medals.findAll({});
      return res.json(getMedals);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Não foi possível listar os registros.',
        details: e.message,
      });
    }
  }

  async getAllCategories(req, res) {
    try {
      const getMedalsCategories = await MedalsCategories.findAll({});
      return res.json(getMedalsCategories);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Não foi possível listar os registros.',
        details: e.message,
      });
    }
  }

  async createMedalCategory(req, res) {
    try {
      const { name, description, position } = req.body;

      const medals = await MedalsCategories.create({
        name,
        description,
        position,
        status: true,
      });
      return res.json(medals);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Não foi possível listar os registros.',
        details: e.message,
      });
    }
  }

  async createMedal(req, res) {
    try {
      const { name, description, image, category_id, position } = req.body;

      const medals = await Medals.create({
        name,
        description,
        image,
        category_id,
        position,
        status: true,
      });
      return res.json(medals);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Não foi possível listar os registros.',
        details: e.message,
      });
    }
  }
}

export default new MedalsController();
