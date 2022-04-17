import ChangelogCategories from '../models/ChangelogCategories';
import ChangelogPosts from '../models/ChangelogPosts';
import Users from '../models/Users';

class ChangelogController {
  async getPagination(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;

    try {
      const total = await ChangelogPosts.count({ order: 'id' });
      res.header('X-Total-Count', total);

      const changelog = await ChangelogPosts.findAll({
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

  async getAllCategories(req, res) {
    try {
      const categories = await ChangelogCategories.findAll({
        where: { status: true },
        order: [['position', 'asc']],
      });
      return res.json(categories);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const changelog = await ChangelogPosts.findAll({
        where: { status: true },

        include: [
          {
            model: Users,
            as: 'author',
            attributes: ['name', 'username', 'avatar_id', 'is_verified'],
          },
          {
            model: ChangelogCategories,
            as: 'categories',
            where: { status: true },
            order: [['categories.position', 'asc']],
            required: false,
          },
        ],
      });

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
      const changelog = await ChangelogPosts.create({
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
      const changelog = await ChangelogPosts.findByPk(req.params.id);

      if (!changelog) {
        return res
          .status(400)
          .json({ error: 'O cargo solicitado não foi encontrado.' });
      }

      await ChangelogPosts.update(req.body);
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
      const isExist = await ChangelogPosts.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(400)
          .json({ error: 'O cargo solicitado não existe.' });
      }
      await ChangelogPosts.destroy({
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
      const count = await ChangelogPosts.count();
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
