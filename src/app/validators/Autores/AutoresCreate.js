import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required('O nome é obrigatório.'),
      profissao: Yup.string().required('A profissão é obrigatória.'),
      avatar_id: Yup.number().typeError('avatar_id deve ser um número'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou', message: e.inner });
  }
};
