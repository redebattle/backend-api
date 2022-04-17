/* eslint-disable no-unused-vars */
import Sequelize, { Op } from 'sequelize';

import fixText from '../../lib/ajustar-texto';
import Medals from '../models/Medals';
import PostArticle from '../models/PostArticle';
import PostCategory from '../models/PostCategory';
import PostComment from '../models/PostComment';
import PostReaction from '../models/PostReaction';
import Uploads from '../models/Uploads';
import Users from '../models/Users';

class PostArticleController {
  async getPaginationIndex(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;
    let sort = req.query.sort ? req.query.sort : 'id';
    let order = req.query.order ? req.query.order : 'asc';
    const sortValid = ['id', 'title', 'createdAt', 'updatedAt', 'access'];
    const orderValid = ['asc', 'desc'];

    try {
      if (!orderValid.includes(order)) {
        order = 'asc';
      }

      if (!sortValid.includes(sort)) {
        sort = 'id';
      }

      const post = await PostArticle.findAndCountAll({
        where: { active: true },
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: [[sort, order]],
        attributes: {
          exclude: ['category_id', 'author_id', 'created_by'],
        },
        include: [
          {
            model: PostCategory,
            as: 'category',
            attributes: ['id', 'name', 'color'],
          },
          {
            model: Users,
            as: 'author',
            attributes: ['id', 'name', 'username', 'avatar_id', 'is_verified'],
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
        status: 400,
        error: true,
        message: 'Não foi possível listar as postagens',
        details: e.message,
      });
    }
  }

  async getSlugIndex(req, res) {
    try {
      const postId = await PostArticle.findOne({
        where: {
          slug: req.params.slug,
        },
        attributes: {
          exclude: ['category_id', 'created_by'],
        },
        include: [
          {
            model: PostCategory,
            as: 'category',
            attributes: ['id', 'name', 'color'],
          },
          {
            model: Users,
            as: 'author',
            attributes: ['id', 'name', 'avatar_id', 'username', 'is_verified'],
            include: [
              {
                model: Medals,
                as: 'medals',
                where: { status: true },
                required: false,
              },
            ],
          },
        ],
      });

      const comments = await PostComment.findAndCountAll({
        where: { post_id: postId.id },
        order: [['created_at', 'asc']],
        attributes: {
          exclude: ['user_id'],
        },
        include: [
          {
            model: Users,
            as: 'user',
            attributes: ['id', 'name', 'avatar_id', 'username', 'is_verified'],
            include: [
              {
                model: Medals,
                as: 'medals',
                where: { status: true },
                required: false,
              },
            ],
          },
        ],
      });

      const reactions = await PostReaction.findAndCountAll({
        where: { post_id: postId.id },
        attributes: {
          exclude: ['user_id'],
        },
        include: [
          {
            model: Users,
            as: 'user',
            attributes: ['id', 'name', 'avatar_id', 'username', 'is_verified'],
          },
        ],
      });

      if (!postId) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      if (!postId.active) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      await PostArticle.update(
        { access: postId.access + 1 },
        { where: { id: postId.id } }
      );
      return res.json({ post: postId, comments, reactions });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar a postagem.',
        message: e.message,
      });
    }
  }

  async createPost(req, res) {
    try {
      const slug = fixText(req.body.title);
      const {
        title,
        content,
        banner_url,
        category,
        active,
        link,
        is_external,
        allow_comments,
        pinned,
      } = req.body;

      const categoriaExist = await PostCategory.findByPk(category);
      if (!categoriaExist) {
        return res
          .status(404)
          .json({ error: 'A categoria informada não existe.' });
      }

      const post = await PostArticle.create({
        title,
        category_id: category,
        content,
        slug,
        banner_url,
        active,
        link,
        is_external,
        allow_comments,
        pinned,
        access: 0,
        total_comments: 0,
        total_reactions: 0,
        edited: false,
        created_by: req.userId,
      });

      return res.status(200).json({ post });
    } catch (e) {
      return res.status(400).send({
        error: 'Não foi possivel criar a postagem',
        message: e.message,
      });
    }
  }

  async getAuthorPosts(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;
    let sort = req.query.sort ? req.query.sort : 'id';
    let order = req.query.order ? req.query.order : 'desc';
    const sortValid = ['id', 'titulo', 'createdAt', 'updatedAt'];
    const orderValid = ['asc', 'desc'];
    const { author } = req.params;

    try {
      if (!orderValid.includes(order)) {
        order = 'asc';
      }

      if (!sortValid.includes(sort)) {
        sort = 'id';
      }

      const getAutor = await Users.findOne({ where: { username: author } });

      if (!getAutor) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: 'Autor não encontrado',
          details: null,
        });
      }

      const post = await PostArticle.findAndCountAll({
        where: { active: true, created_by: getAutor.id },
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: [[sort, order]],
        attributes: {
          exclude: ['category_id', 'created_by'],
        },
        include: [
          {
            model: PostCategory,
            as: 'category',
            attributes: ['id', 'name', 'color'],
          },
          {
            model: Users,
            as: 'author',
            attributes: ['id', 'name', 'username', 'is_verified', 'avatar_id'],
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

  async deletePost(req, res) {
    try {
      const isExist = await PostArticle.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(404)
          .json({ error: 'A postagem solicitada não existe.' });
      }
      await PostArticle.destroy({
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

  async changeStatus(req, res) {
    try {
      const post = await PostArticle.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Postagem não encontrada.' });
      }

      const status = !post.visivel;
      await post.update({ visivel: status });
      return res.json(post);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível alterar o status da postagem.',
        message: e.message,
      });
    }
  }
}
export default new PostArticleController();
