import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required('O título é obrigatório.'),
      content: Yup.string().required('O conteúdo é obrigatório.'),
      category: Yup.number()
        .typeError('A categoria deve ser um número.')
        .required('A campo categoria é obrigatório.'),
      banner_url: Yup.string().typeError(
        'O campo header deve ser uma URL de imagem.'
      ),
      link: Yup.string(),
      active: Yup.boolean().typeError('O status deve ser um Boolean.'),
      is_external: Yup.boolean().typeError('O status deve ser um Boolean.'),
      allow_comments: Yup.boolean().typeError('O status deve ser um Boolean.'),
      pinned: Yup.boolean().typeError('O status deve ser um Boolean.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou', message: e.inner });
  }
};
