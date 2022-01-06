import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required('O nome é obrigatório.'),
      cargo_id: Yup.number()
        .typeError('O cargo deve ser um ID.')
        .required('O cargo é obrigatório.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou', message: e.inner });
  }
};
