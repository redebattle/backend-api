// Controller
import EncurtadorController from '../../app/controllers/EncurtadorController';

// Validação
import EncurtadorCreateValidacao from '../../app/validators/Encurtador/EncurtadorCreate';

// Permissões
// import NOME from '../../app/Roles/NOME';

export default (routes, auth) => {
  routes.post(
    '/api/v1/encurtador',
    auth,
    EncurtadorCreateValidacao,
    EncurtadorController.create
  );

  routes.delete('/api/v1/encurtador/:id', auth, EncurtadorController.delete);

  routes.get('/api/v1/encurtador', auth, EncurtadorController.getAll);

  routes.get('/api/v1/encurtador/:slug', EncurtadorController.getBySlug);

  routes.get('/api/v1/short', EncurtadorController.redirect);
};
