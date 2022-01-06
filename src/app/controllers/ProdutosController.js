import Produtos from '../models/Produtos';
import Servidores from '../models/Servidores';

class ProdutosController {
  async index(req, res) {
    try {
      const { servidor } = req.query ? req.query : 0;

      const servidorExist = await Servidores.findOne({
        where: { id: servidor },
      });

      if (!servidorExist) {
        res.status(404).json({ error: 'Servidor não existe' });
      }
      const produtos = await Produtos.findAndCountAll({
        where: { servidor_id: servidor },
        include: [
          {
            model: Servidores,
            as: 'servidor',
          },
        ],
      });
      res.json(produtos);
    } catch (e) {
      res.status(400).json({
        error: 'Não foi possível listar os produtos',
        message: e.message,
      });
    }
  }
}

export default new ProdutosController();
