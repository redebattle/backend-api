import Configuracoes from '../models/Configuracoes';

class ConfiguracoesController {
  async checkManutencao(req, res) {
    try {
      const manutencao = await Configuracoes.findOne({
        where: { maintenance_mode: true },
      });
      if (!manutencao) {
        return res.json(false);
      }
      return res.json(true);
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao verificar manutenção.',
        message: e.message,
      });
    }
  }

  async editStatusManutencao(req, res) {
    const { status } = req.body;
    try {
      const getConfig = await Configuracoes.findByPk(1);
      await getConfig.update({ maintenance_mode: status });
      return res.json({ getConfig });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro ao executar.', message: e.message });
    }
  }

  async getManutencaoMensagem(req, res) {
    try {
      const mensagem = await Configuracoes.findByPk(1);
      return res.json({ maintenance_message: mensagem.manutencao_mensagem });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao obter mensagem de manutenção.',
        message: e.message,
      });
    }
  }

  async editMensagemManutencao(req, res) {
    const { mensagem } = req.body;
    try {
      const getConfig = await Configuracoes.findByPk(1);

      await getConfig.update({ maintenance_message: mensagem });

      return res.json(getConfig);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro ao executar.', message: e.message });
    }
  }

  async getRedesSociais(req, res) {
    try {
      const social = await Configuracoes.findByPk(1, {
        attributes: [
          'facebook_url',
          'twitter_url',
          'discord_url',
          'instagram_url',
          'youtube_url',
        ],
      });
      return res.json(social);
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao obter as Redes Sociais.',
        message: e.message,
      });
    }
  }

  async getIP(req, res) {
    try {
      const info = await Configuracoes.findByPk(1, {
        attributes: ['server_ip', 'server_port'],
      });
      return res.json(info);
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao acessar a API getIP.',
        message: e.message,
      });
    }
  }
}

export default new ConfiguracoesController();
