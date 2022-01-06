import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required('O nome é obrigatório.'),
      email: Yup.string().email().required('O email é obrigatório.'),
      avatar_id: Yup.number().typeError('avatar_id deve ser um número'),
      senha: Yup.string().required('A senha é obrigatória.').min(6),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      // ),
      confirmarsenha: Yup.string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou.', messages: e.inner });
  }
};
