import Uploads from '../models/Uploads';

class FileController {
  async uploadImg(req, res) {
    try {
      const {
        originalname: nome,
        filename: path,
        size: tamanho,
        fieldname: tipo,
      } = req.file;

      const file = await Uploads.create({
        nome,
        path,
        tamanho,
        tipo,
      });

      return res.json({ file });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Falha ao enviar arquivo.', message: e.message });
    }
  }

  async uploadFile(req, res) {
    try {
      const {
        originalname: nome,
        filename: path,
        size: tamanho,
        fieldname: tipo,
      } = req.file;

      const file = await Uploads.create({
        nome,
        path,
        tamanho,
        tipo,
      });

      return res.json({ file });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Falha ao enviar arquivo.', message: e.message });
    }
  }
}

export default new FileController();
