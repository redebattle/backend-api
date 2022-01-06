import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      titulo: Yup.string().required('O campo título é obrigatório.'),
      conteudo: Yup.string().required('O campo conteúdo é obrigatório.'),
      categoria: Yup.number()
        .typeError('O campo categoria deve ser um número.')
        .required('O campo categoria é obrigatório.'),
      header: Yup.string().typeError(
        'O campo header deve ser uma URL de imagem.'
      ),
      visivel: Yup.boolean().typeError('O campo visivel deve ser um Boolean.'),
      acessos: Yup.number().typeError('O campo acesso deve ser um número.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou', message: e.inner });
  }
};
