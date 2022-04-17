import Postagens from '../models/PostArticle';
import PostReaction from '../models/PostReaction';

class PostReactionsController {
  async createReaction(req, res) {
    try {
      const { post_id } = req.params;
      const post = await Postagens.findByPk(post_id);

      if (!post) {
        return res.status(404).json({
          status: 400,
          error: true,
          message: 'Postagem não encontrada.',
        });
      }

      const verifyReact = await PostReaction.findOne({
        where: { post_id, user_id: req.userId },
      });
      if (verifyReact) {
        verifyReact.destroy();

        post.total_reactions--;
        post.save(post);

        return res.json({ reaction: verifyReact, total: post.total_reactions });
      }
      const react = await PostReaction.create({
        post_id,
        user_id: req.userId,
      });

      post.total_reactions++;
      post.save(post);
      return res.json({ reaction: react, total: post.total_reactions });
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

export default new PostReactionsController();
