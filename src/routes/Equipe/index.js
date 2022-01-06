// Controller
import EquipeController from '../../app/controllers/EquipeController';
import validationEquipeCreate from '../../app/validators/Equipe/EquipeCreate';

export default (routes, auth) => {
  // Routes Public
  routes.get('/api/v1/equipe/all', EquipeController.getAll);
  routes.get('/api/v1/equipe', EquipeController.getCargosByPosition);
  routes.get('/api/v1/equipe/count/:id', EquipeController.countMemberByCargo);

  // Routes Private

  routes.post(
    '/api/v1/equipe',
    auth,
    validationEquipeCreate,
    EquipeController.create
  );
  routes.delete('/api/v1/equipe/:id', auth, EquipeController.delete);
  routes.put('/api/v1/equipe/:id', auth, EquipeController.edit);
};
