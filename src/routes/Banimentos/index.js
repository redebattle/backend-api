// Controller
import BanimentosController from '../../app/controllers/bungee.controllers/BanimentosController';

// Validação
// import NOME from '../../app/validators/NOME/NOME';

// Permissões
// import NOME from '../../app/Roles/NOME';

export default (routes, auth) => {
  // Routes Public

  // routes.get('/teste', BanimentosController.getall);

  // Routes Private

  routes.get('/api/v1/banimentos/all', BanimentosController.getall);
  routes.get('/api/v1/banimentos/id/:id', BanimentosController.getByID);

  routes.get(
    '/api/v1/banimentos/estatisticas',
    BanimentosController.getStatistic
  );

  routes.get('/api/v1/banimentos/check/:user', BanimentosController.checkBan);
};
