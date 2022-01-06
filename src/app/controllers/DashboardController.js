import Postagens from '../models/Postagens';

class DashboardController {
  async index(req, res) {
    const totalPostagens = await Postagens.count({ where: { visivel: true } });

    return res.json({ postagens: totalPostagens, tickets: '0', vendas: '0' });
  }
}

export default new DashboardController();
