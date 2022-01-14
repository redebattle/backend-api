import Servidores from '../models/Servidores';

class ServidoresController {
  async getAll(req, res) {
    try {
      const data = await Servidores.findAll();
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async getByName(req, res) {
    try {
      const { nome } = req.query;
      const data = await Servidores.findOne({ where: { nome } });
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { nome } = req.body;
      const isExist = await Servidores.findOne({
        where: {
          nome,
        },
      });

      if (isExist) {
        return res
          .status(400)
          .json({ error: 'Já existe um servidor com este nome.' });
      }

      const data = await Servidores.create(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível criar o registro.',
        message: e.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const isExist = await Servidores.findByPk(req.params.id);

      if (!isExist) {
        return res
          .status(404)
          .json({ error: 'Não existe um servidor com esse ID.' });
      }
      await Servidores.destroy({ where: { id: req.params.id } });
      return res.json({ sucess: 'Servidor removido com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao remover o registro.',
        message: e.message,
      });
    }
  }

  async edit(req, res) {
    try {
      const isExist = await Servidores.findByPk(req.params.id);

      if (!isExist) {
        return res
          .status(404)
          .json({ error: 'Não existe um servidor com esse ID.' });
      }
      await isExist.update(req.body);
      return res.json({ isExist });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível editar o registro.',
        message: e.message,
      });
    }
  }
}

export default new ServidoresController();
