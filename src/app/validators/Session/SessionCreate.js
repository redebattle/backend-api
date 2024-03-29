import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required('O email é obrigatório.'),
      password: Yup.string().min(6).required('A senha é obrigatória.'),
      recaptcha_token: Yup.string().required('O token recaptcha é obrigatório'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou.', message: e.inner });
  }
};
