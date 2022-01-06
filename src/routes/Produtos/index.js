// Controller
import ProdutosController from '../../app/controllers/ProdutosController';

export default (routes, auth) => {
  // Routes Public

  routes.get('/api/v1/produtos', auth, ProdutosController.index);
};
