import e from 'express';

import PostArticle from '../models/PostArticle';
import Postagens from '../models/PostArticle';
import PostComment from '../models/PostComment';

class CommentsController {
  async createComment(req, res) {
    try {
      const { post_id, content } = req.body;

      const post = await Postagens.findByPk(post_id);

      if (!post) {
        return res.status(404).json({
          status: 404,
          error: true,
          message: 'Postagem não encontrada.',
        });
      }

      const comment = await PostComment.create({
        post_id,
        content,
        user_id: req.userId,
        edited: false,
      });

      post.total_comments++;
      post.save(post);

      return res.json(comment);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Não foi possível criar o registro.',
        details: e.message,
      });
    }
  }

  async deleteComment(req, res) {
    try {
      const comment = await PostComment.findByPk(req.params.id);
      const post = await PostArticle.findByPk(comment.post_id);

      if (!comment) {
        return res.status(404).json({
          status: 404,
          error: true,
          message: 'Comentário não encontrado.',
        });
      }

      await PostComment.destroy({ where: { id: req.params.id } });

      post.total_comments--;
      post.save(post);

      return res.json({
        status: 200,
        error: false,
        message: 'Comentário deletado com sucesso!',
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Não foi possível criar o registro.',
        details: e.message,
      });
    }
  }

  async editComment(req, res) {
    try {
      const { content } = req.body;

      const comment = await PostComment.findByPk(req.params.id);

      if (!comment) {
        return res.status(404).json({
          status: 404,
          error: true,
          message: 'Comentário não encontrado.',
        });
      }

      const edited = await comment.update({ content, edited: true });
      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Não foi possível criar o registro.',
        details: e.message,
      });
    }
  }

  async toggleCommentsPermission(req, res) {
    try {
      const { allow_comments } = req.body;

      const post = await PostArticle.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({
          status: 404,
          error: true,
          message: 'Postagem não encontrada.',
        });
      }

      const edited = await post.update({ allow_comments });
      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Não foi possível criar o registro.',
        details: e.message,
      });
    }
  }
}

export default new CommentsController();
