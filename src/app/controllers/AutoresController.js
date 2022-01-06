/* eslint-disable no-unused-vars */
import fs from 'fs';
import { resolve } from 'path';

import Autores from '../models/Autores';
import Upload from '../models/Uploads';

class AutoresController {
  async getPagination(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const quantityPage = req.query.itens ? req.query.itens : 20;

    try {
      const total = await Autores.count({ order: 'id' });
      res.header('X-Total-Count', total);

      const autores = await Autores.findAll({
        offset: (page - 1) * quantityPage,
        limit: quantityPage,
        order: ['nome'],
        attributes: { exclude: ['avatar_id'] },
        include: [
          {
            model: Upload,
            as: 'avatar',
            attributes: ['path', 'url', 'id', 'tipo'],
          },
        ],
      });

      return res.json({
        obj: autores,
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
      const autores = await Autores.findAll({
        attributes: { exclude: ['avatar_id'] },
        include: [
          {
            model: Upload,
            as: 'avatar',
            attributes: ['path', 'url', 'id', 'tipo'],
          },
        ],
      });
      return res.json(autores);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async getId(req, res) {
    try {
      const autor = await Autores.findByPk(req.params.id, {
        attributes: { exclude: ['avatar_id'] },
        include: [
          {
            model: Upload,
            as: 'avatar',
            attributes: ['path', 'url', 'id', 'tipo'],
          },
        ],
      });

      if (!autor) {
        return res
          .status(400)
          .json({ error: 'O autor solicitado não foi encontrado.' });
      }
      return res.json(autor);
    } catch (e) {
      return res
        .status(400)
        .send({ error: 'Não foi possível buscar o registro.' });
    }
  }

  async createAutores(req, res) {
    try {
      if (req.body.avatar_id) {
        const userAvatar = await Upload.findByPk(req.body.avatar_id);

        if (!userAvatar) {
          return res
            .status(400)
            .json({ error: 'ID do avatar não encontrado.' });
        }

        if (userAvatar.tipo !== 'img') {
          return res
            .status(400)
            .json({ error: 'Tipo de avatar não suportado.' });
        }
      }
      const autores = await Autores.create(req.body);
      return res.send({ autores });
    } catch (e) {
      return res.status(400).send({
        error: 'Nao foi possivel criar o registro.',
        message: e.message,
      });
    }
  }

  async updateAutores(req, res) {
    try {
      const autores = await Autores.findByPk(req.params.id);

      if (!autores) {
        return res
          .status(400)
          .json({ error: 'O autor solicitado não foi encontrado.' });
      }

      if (req.body.avatar_id) {
        if (autores.avatar_id !== null) {
          const userAvatar = await Upload.findByPk(autores.avatar_id);
          const folderDestination = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            'img',
            userAvatar.path
          );

          const avatarExist = await fs.promises.stat(folderDestination);

          if (avatarExist) {
            const newAvatarExist = await Upload.findByPk(req.body.avatar_id);

            if (autores.avatar_id === req.body.avatar_id) {
              return res.send();
            }

            if (!newAvatarExist) {
              return res
                .status(400)
                .json({ error: 'ID do avatar não encontrado.' });
            }

            await fs.unlink(folderDestination, function (err, data) {
              if (err) console.log(err);
            });

            await userAvatar.destroy();
          }
        }
      }

      await autores.update(req.body);
      return res.json({ autores });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível alterar o registro.',
        message: e.message,
      });
    }
  }

  async deleteAutor(req, res) {
    try {
      const autor = await Autores.findByPk(req.params.id);

      if (!autor) {
        return res
          .status(400)
          .json({ error: 'O autor solicitado não foi encontrado.' });
      }

      if (autor.avatar_id !== null) {
        const userAvatar = await Upload.findByPk(autor.avatar_id);

        const folderDestination = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'uploads',
          'img',
          userAvatar.path
        );

        const avatarExist = await fs.promises.stat(folderDestination);

        if (avatarExist) {
          await fs.unlink(folderDestination, function (err, data) {
            if (err) console.log(err);
          });

          await userAvatar.destroy();
        }
      }

      await Autores.destroy({ where: { id: req.params.id } });

      return res.json({ sucess: 'Registro removido com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível excluir o registro.',
        message: e.message,
      });
    }
  }
}

export default new AutoresController();
