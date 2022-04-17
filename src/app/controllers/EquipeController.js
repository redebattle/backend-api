import Cargo from '../models/Cargos';
import Changelog from '../models/ChangelogPosts';
import Equipes from '../models/Equipes';
import Equipe from '../models/Staffs';

class EquipeController {
  // async getAll(req, res) {
  //   try {
  //     const equipe = await Equipes.findAll({

  //       include: [
  //         {
  //           model: Cargo,

  //           attributes: [],
  //         },
  //         {
  //           model: Equipe,
  //           as: 'staffs',
  //           attributes: ['nome']
  //         },
  //       ],
  //       group: ['Cargo.posicao'],
  //       raw:true,

  //     });
  //     return res.json(equipe);
  //   } catch (e) {
  //     return res.status(400).json({
  //       error: 'Não foi possível listar os registros.',
  //       message: e.message,
  //     });
  //   }
  // }

  async getAll(req, res) {
    try {
      const equipe = await Equipe.findAll({
        include: [
          {
            model: Cargo,
            as: 'cargos',
            attributes: ['nome', 'posicao', 'cor'],
          },
        ],
        order: [['cargo_id', 'asc']],
      });

      return res.json(equipe);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async countMemberByCargo(req, res) {
    try {
      const equipe = await Equipe.findAndCountAll({
        where: { cargo_id: req.params.id },
      });

      return res.json(equipe);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível carregar o registro.',
        message: e.message,
      });
    }
  }

  async getCargosByPosition(req, res) {
    const { cargo } = req.query;
    try {
      const equipe = await Equipe.findAndCountAll({
        include: [
          {
            model: Cargo,
            as: 'cargos',
            where: {
              nome: cargo,
            },
            attributes: ['nome', 'posicao', 'cor'],
          },
        ],
      });
      return res.json(equipe);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async getCargoByMember(req, res) {
    const { nome } = req.params;
    try {
      const member = await Equipe.findOne(
        { where: { nome } },
        {
          include: [
            {
              model: Cargo,
            },
          ],
        }
      );
      return res.json(member);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async create(req, res) {
    const { nome, cargo_id } = req.body;
    try {
      const cargoExist = await Cargo.findByPk(cargo_id);

      if (!cargoExist) {
        return res.status(404).json({ error: 'Cargo não existe.' });
      }

      const nameExist = await Equipe.findOne({
        where: {
          nome,
        },
      });

      if (nameExist) {
        return res
          .status(400)
          .json({ error: 'Esse usuário já faz parte da equipe.' });
      }

      const equipe = await Equipe.create({ nome, cargo_id });
      await Changelog.create({
        titulo: 'Novos integrante(s)',
        topicos: `${nome} agora integra à equipe.`,
        categoria: 'equipe',
      });
      return res.json(equipe);
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao criar o registro.',
        message: e.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const isExist = await Equipe.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(404)
          .json({ error: 'Não existe nenhum registro com esse ID.' });
      }
      console.log(isExist);
      await Changelog.create({
        titulo: 'Remoção',
        topicos: `${isExist.nome} não integra mais a equipe.`,
        categoria: 'equipe',
      });
      await Equipe.destroy({ where: { id: req.params.id } });
      return res.json({ sucess: 'Removido com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível remover o registro.',
        message: e.message,
      });
    }
  }

  async edit(req, res) {
    try {
      const isExist = await Equipe.findByPk(req.params.id);
      if (!isExist) {
        return res
          .status(404)
          .json({ error: 'Nenhum registro foi encontrado com esse ID.' });
      }

      await isExist.update(req.body);
      return res.json(isExist);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível editar o registro.',
        message: e.message,
      });
    }
  }
}

export default new EquipeController();
