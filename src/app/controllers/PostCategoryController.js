import sequelize from 'sequelize';

import PostCategory from '../models/PostCategory';

class PostCategoryController {
  async getPagination(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;

    try {
      const total = await Categoria.count({ order: 'id' });
      res.header('X-Total-Count', total);

      const categorias = await Categoria.findAll({
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: ['codigo'],
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
      const categorias = await PostCategory.findAll();
      return res.json(categorias);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async createCategoria(req, res) {
    try {
      const categoria = await PostCategory.create(req.body);
      return res.json(categoria);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível criar o registro.',
        message: e.message,
      });
    }
  }

  async getId(req, res) {
    try {
      const categoriaId = await Categoria.findByPk(req.params.id);
      if (!categoriaId) {
        return res
          .status(400)
          .json({ error: 'Não foi encontrada nenhuma categoria.' });
      }
      return res.json(categoriaId);
    } catch (e) {
      return res
        .status(400)
        .send({ error: 'Não foi possível buscar o registro.' });
    }
  }

  async updateId(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);

      if (!categoria) {
        return res
          .status(400)
          .json({ error: 'A categoria solicitada não foi encontrada.' });
      }

      const checkCategoria = await Categoria.findOne({
        where: { codigo: req.body.codigo },
      });

      if (checkCategoria) {
        return res
          .status(400)
          .json({ error: 'Já existe uma categoria com esse código.' });
      }

      await categoria.update(req.body);
      return res.send({ categoria });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível alterar o registro.',
        message: e.message,
      });
    }
  }

  async deleteId(req, res) {
    try {
      const isExist = await Categoria.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(400)
          .json({ error: 'A categoria solicitada não existe.' });
      }
      await Categoria.destroy({
        where: { id: req.params.id },
      });
      return res.json({ sucess: 'Registro removido com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível excluir o registro.',
        message: e.message,
      });
    }
  }

  async checkExist(req, res) {
    try {
      const isExist = await Categoria.findOne({
        where: { codigo: req.params.id },
      });

      if (isExist) {
        return res
          .status(200)
          .json({ message: `O código ${req.params.id} já existe` });
      }

      return res.send();
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível mostrar o registro.',
        message: e.message,
      });
    }
  }

  async proximoCodigo(req, res) {
    try {
      const categoria = await Categoria.findOne({
        attributes: [[sequelize.fn('max', sequelize.col('codigo')), 'maior']],
      });

      const proximo = categoria.dataValues.maior + 1;

      return res.json(proximo);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }
}

export default new PostCategoryController();
