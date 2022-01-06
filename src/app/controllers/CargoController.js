import Cargo from '../models/Cargos';
import Equipe from '../models/Staffs';

class CargoController {
  async getPagination(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;

    try {
      const total = await Cargo.count({ order: 'id' });
      res.header('X-Total-Count', total);

      const categorias = await Cargo.findAll({
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: ['id'],
      });

      return res.json({
        obj: categorias,
        pagina: page,
        quantidade: quantityPage,
        total,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const categorias = await Cargo.findAll({ order: ['posicao'] });

      return res.json(categorias);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async countMemberByCargo(req, res) {
    try {
      const categorias = await Cargo.findAndCountAll({
        order: ['posicao'],
        where: { id: req.params.id },
      });

      return res.json(categorias);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async createCargo(req, res) {
    const { nome, posicao, cor } = req.body;
    try {
      const cargo = await Cargo.create({
        nome,
        posicao,
        cor,
        created_by: req.userId,
      });
      return res.send({ cargo });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível criar o registro.',
        message: e.message,
      });
    }
  }

  async updateId(req, res) {
    try {
      const cargo = await Cargo.findByPk(req.params.id);

      if (!cargo) {
        return res
          .status(400)
          .json({ error: 'O cargo solicitado não foi encontrado.' });
      }

      await cargo.update(req.body);
      return res.json(cargo);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível alterar o registro.',
        message: e.message,
      });
    }
  }

  async deleteId(req, res) {
    try {
      const isExist = await Cargo.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(400)
          .json({ error: 'O cargo solicitada não existe.' });
      }
      await Cargo.destroy({
        where: { id: req.params.id },
      });
      return res.json({ sucess: 'Cargo removido com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível excluir o registro.',
        message: e.message,
      });
    }
  }
}

export default new CargoController();
