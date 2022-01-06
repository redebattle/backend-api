import Encurtador from '../models/Encurtador';

class EncurtadorURLsController {
  async getAll(req, res) {
    try {
      const encurtador = await Encurtador.findAll({ order: [['id', 'desc']] });
      return res.json(encurtador);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async getBySlug(req, res) {
    try {
      const link = await Encurtador.findOne({
        where: { slug: req.params.slug },
      });
      if (!link) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }

      return res.json(link);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async create(req, res) {
    const { url, slug } = req.body;
    let shortUrl;
    let result = '';
    let shortSlug;

    try {
      if (!slug) {
        const possibilidades =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const { length } = possibilidades;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 6; i++) {
          result += possibilidades.charAt(Math.floor(Math.random() * length));
        }
        shortUrl = `${process.env.URL_ENCURTADOR}/${result}`;

        await Encurtador.create({
          original_url: url,
          short_url: shortUrl,
          slug: result,
          acess: 0,
        });
      } else {
        const isExist = await Encurtador.findOne({ where: { slug } });
        if (!isExist) {
          shortUrl = `${process.env.URL_ENCURTADOR}/${slug}`;
          await Encurtador.create({
            original_url: url,
            short_url: shortUrl,
            slug,
            acess: 0,
          });
        } else {
          return res
            .status(400)
            .json({ error: 'Essa slug já esta sendo utilizada.' });
        }
      }

      shortSlug = !slug ? result : slug;

      if (!slug) {
        shortSlug = result;
      } else {
        shortSlug = slug;
      }

      return res.json({
        shortUrl,
        slug: shortSlug,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível encurtar a URL.',
        message: e.message,
      });
    }
  }

  async redirect(req, res) {
    const { url } = req.query;
    try {
      const isExist = await Encurtador.findOne({ where: { short_url: url } });
      if (!isExist) {
        res.redirect('https://battlecraft.com.br');
      }
      await Encurtador.update(
        { acess: isExist.acess + 1 },
        { where: { id: isExist.id } }
      );
      return res.redirect(isExist.original_url);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro ao executar.', message: e.message });
    }
  }

  async delete(req, res) {
    try {
      const link = await Encurtador.findByPk(req.params.id);
      if (!link) {
        return res.status(404).json({ error: 'Link não encontrado.' });
      }
      await link.destroy();
      return res.json({ sucess: 'Link removido com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível excluír o registro.',
        message: e.message,
      });
    }
  }
}

export default new EncurtadorURLsController();
