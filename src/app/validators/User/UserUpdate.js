import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number().typeError('avatar_id deve ser um número'),
      senhaantiga: Yup.string().min(6),
      senha: Yup.string()
        .min(6)
        .when('senhaantiga', (senhaantiga, field) =>
          senhaantiga ? field.required() : field
        ),
      confirmarsenha: Yup.string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou.', message: e.inner });
  }
};
