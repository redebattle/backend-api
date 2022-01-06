import Changelog from '../models/Changelogs';

class ChangelogController {
  async getPagination(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;

    try {
      const total = await Changelog.count({ order: 'id' });
      res.header('X-Total-Count', total);

      const changelog = await Changelog.findAll({
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: ['id'],
      });

      return res.json({
        obj: changelog,
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
      const changelog = await Changelog.findAll();
      return res.json(changelog);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async create(req, res) {
    const { titulo, topicos, categoria } = req.body;
    try {
      const changelog = await Changelog.create({
        titulo,
        topicos,
        categoria,
        created_by: req.userId,
      });
      return res.send({ changelog });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível criar o registro.',
        message: e.message,
      });
    }
  }

  async updateId(req, res) {
    try {
      const changelog = await Changelog.findByPk(req.params.id);

      if (!changelog) {
        return res
          .status(400)
          .json({ error: 'O cargo solicitado não foi encontrado.' });
      }

      await Changelog.update(req.body);
      return res.send();
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível alterar o registro.',
        message: e.message,
      });
    }
  }

  async deleteId(req, res) {
    try {
      const isExist = await Changelog.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(400)
          .json({ error: 'O cargo solicitado não existe.' });
      }
      await Changelog.destroy({
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

  async count(req, res) {
    try {
      const count = await Changelog.count();
      console.log(count);
      return res.json(count);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro ao executar.', message: e.message });
    }
  }
}

export default new ChangelogController();
