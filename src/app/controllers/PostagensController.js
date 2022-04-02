/* eslint-disable no-unused-vars */
import Sequelize, { Op } from 'sequelize';

import fixText from '../../lib/ajustar-texto';
import Categoria from '../models/Categoria';
import Postagens from '../models/Postagens';
import Usuario from '../models/Usuario';

class PostagensController {
  async getPaginationIndex(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;
    let sort = req.query.sort ? req.query.sort : 'id';
    let order = req.query.order ? req.query.order : 'asc';
    const sortValid = ['id', 'titulo', 'createdAt', 'updatedAt'];
    const orderValid = ['asc', 'desc'];

    try {
      if (!orderValid.includes(order)) {
        order = 'asc';
      }

      if (!sortValid.includes(sort)) {
        sort = 'id';
      }

      const post = await Postagens.findAndCountAll({
        where: { visivel: true },
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: [[sort, order]],
        attributes: {
          exclude: ['categoria_id', 'autor_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
      });

      res.header('X-Total-Count', post.count);
      res.header('X-Sort', sort);
      res.header('X-Order', order);

      return res.json({
        obs: post,
        pagina: page,
        quantidade: quantityPage,
        total: post.count,
        sort,
        order,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar as postagens',
        message: e.message,
      });
    }
  }

  async getAuthroPosts(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;
    let sort = req.query.sort ? req.query.sort : 'id';
    let order = req.query.order ? req.query.order : 'desc';
    const sortValid = ['id', 'titulo', 'createdAt', 'updatedAt'];
    const orderValid = ['asc', 'desc'];
    const { autor } = req.params;

    try {
      if (!orderValid.includes(order)) {
        order = 'asc';
      }

      if (!sortValid.includes(sort)) {
        sort = 'id';
      }

      const getAutor = await Usuario.findOne({ where: { nome: autor } });

      const post = await Postagens.findAndCountAll({
        where: { visivel: true, created_by: getAutor.id },
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: [[sort, order]],
        attributes: {
          exclude: ['categoria_id', 'autor_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
      });

      res.header('X-Total-Count', post.count);
      res.header('X-Sort', sort);
      res.header('X-Order', order);

      return res.json({
        obs: post,
        pagina: page,
        quantidade: quantityPage,
        total: post.count,
        sort,
        order,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar as postagens',
        message: e.message,
      });
    }
  }

  async getPaginationAdmin(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;
    let sort = req.query.sort ? req.query.sort : 'id';
    let order = req.query.order ? req.query.order : 'asc';
    const sortValid = ['id', 'titulo', 'createdAt', 'updatedAt'];
    const orderValid = ['asc', 'desc'];

    try {
      if (!orderValid.includes(order)) {
        order = 'asc';
      }

      if (!sortValid.includes(sort)) {
        sort = 'id';
      }

      const post = await Postagens.findAndCountAll({
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: [[sort, order]],
        attributes: {
          exclude: ['conteudo', 'categoria_id', 'autor_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
      });

      res.header('X-Total-Count', post.count);
      res.header('X-Sort', sort);
      res.header('X-Order', order);

      return res.json({
        obs: post,
        pagina: page,
        quantidade: quantityPage,
        total: post.count,
        sort,
        order,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar as postagens',
        message: e.message,
      });
    }
  }

  async searchIndex(req, res) {
    const { filtro } = req.query;
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;
    let sort = req.query.sort ? req.query.sort : 'id';
    let order = req.query.order ? req.query.order : 'asc';
    const sortValid = ['id', 'titulo', 'createdAt', 'updatedAt'];
    const orderValid = ['asc', 'desc'];

    try {
      if (!orderValid.includes(order)) {
        order = 'asc';
      }

      if (!sortValid.includes(sort)) {
        sort = 'id';
      }

      const post = await Postagens.findAndCountAll({
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        where: {
          visivel: true,
          [Op.or]: [
            Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('titulo')), {
              [Op.iLike]: `%${filtro}%`,
            }),
            { titulo: { [Op.iLike]: `%${filtro}%` } },
          ],
        },
        order: [[sort, order]],
        attributes: {
          exclude: ['conteudo', 'categoria_id', 'autor_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
      });

      res.header('X-Total-Count', post.count);
      res.header('X-Sort', sort);
      res.header('X-Order', order);

      return res.json({
        obj: post,
        pagina: page,
        quantidade: quantityPage,
        sort,
        order,
        total: post.count,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregas o registro',
        message: e.message,
      });
    }
  }

  async getAllIndex(req, res) {
    try {
      const posts = await Postagens.findAll({
        where: { visivel: true },
        attributes: {
          exclude: ['conteudo', 'categoria_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
        order: [['id', 'desc']],
      });
      return res.json(posts);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar as postagens',
        message: e.message,
      });
    }
  }

  async getAllAdmin(req, res) {
    try {
      const posts = await Postagens.findAll({
        attributes: {
          exclude: ['conteudo', 'categoria_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
        order: [['id', 'desc']],
      });
      return res.json(posts);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar as postagens',
        message: e.message,
      });
    }
  }

  async getIdIndex(req, res) {
    try {
      const postId = await Postagens.findByPk(req.params.id, {
        attributes: {
          exclude: ['categoria_id', 'autor_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
      });

      if (!postId) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      if (!postId.visivel) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      await Postagens.update(
        { acessos: postId.acessos + 1 },
        { where: { id: postId.id } }
      );
      return res.json(postId);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar a postagem.',
        message: e.message,
      });
    }
  }

  async getSlugIndex(req, res) {
    try {
      const postId = await Postagens.findOne({
        where: {
          slug: req.params.slug,
        },
        attributes: {
          exclude: ['categoria_id', 'autor_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
      });

      if (!postId) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      if (!postId.visivel) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      await Postagens.update(
        { acessos: postId.acessos + 1 },
        { where: { id: postId.id } }
      );
      return res.json(postId);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar a postagem.',
        message: e.message,
      });
    }
  }

  async getIdAdmin(req, res) {
    try {
      const postId = await Postagens.findByPk(req.params.id, {
        attributes: {
          exclude: ['categoria_id', 'autor_id', 'created_by'],
        },
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['id', 'descricao'],
          },
          {
            model: Usuario,
            as: 'autor',
            attributes: ['id', 'nome', 'avatar_id'],
          },
        ],
      });

      if (!postId) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      await Postagens.update(
        { acessos: postId.acessos + 1 },
        { where: { id: postId.id } }
      );
      return res.json(postId);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar a postagem.',
        message: e.message,
      });
    }
  }

  async createPost(req, res) {
    try {
      const slug = fixText(req.body.titulo);
      const { titulo, conteudo, visivel, categoria, link, header } = req.body;

      const categoriaExist = await Categoria.findByPk(categoria);
      if (!categoriaExist) {
        return res
          .status(404)
          .json({ error: 'A categoria informada não existe.' });
      }

      const post = await Postagens.create({
        slug,
        titulo,
        conteudo,
        created_by: req.userId,
        categoria_id: categoria,
        visivel,
        acessos: 0,
        link,
        header,
      });

      return res.status(200).json({ post });
    } catch (e) {
      return res.status(400).send({
        error: 'Não foi possivel criar a postagem',
        message: e.message,
      });
    }
  }

  async deletePost(req, res) {
    try {
      const isExist = await Postagens.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(404)
          .json({ error: 'A postagem solicitada não existe.' });
      }
      await Postagens.destroy({
        where: { id: req.params.id },
      });
      return res.json({ sucess: 'Postagem removido com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível excluir a postagem.',
        message: e.message,
      });
    }
  }

  async editPost(req, res) {
    try {
      const post = await Postagens.findByPk(req.params.id);

      if (!post) {
        return res.status(400).json({ error: 'Postagem não encontrada.' });
      }

      await post.update(req.body);
      return res.json(post);
    } catch (e) {
      res.status(400).json({
        error: 'Não foi possível editar a postagem.',
        message: e.message,
      });
    }
  }

  async changeStatus(req, res) {
    try {
      const post = await Postagens.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      const status = !post.visivel;
      await post.update({ visivel: status });
      return res.json(post);
    } catch (e) {
      res.status(400).json({
        error: 'Não foi possível alterar o status da postagem.',
        message: e.message,
      });
    }
  }
}
export default new PostagensController();
