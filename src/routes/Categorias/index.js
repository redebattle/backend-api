import CategoriaController from '../../app/controllers/CategoriaController';
import categoriaRoles from '../../app/Roles/Categoria';
import validateCategoriaCreate from '../../app/validators/Categorias/CategoriaCreate';
import validateCategoriaUpdate from '../../app/validators/Categorias/CategoriaUpdate';

// Permissões

export default (routes, auth) => {
  // Routes Private

  routes.post(
    '/api/v1/categoria',
    auth,
    categoriaRoles,
    validateCategoriaCreate,
    CategoriaController.createCategoria
  );

  routes.put(
    '/api/v1/categoria/:id',
    auth,
    categoriaRoles,
    validateCategoriaUpdate,
    CategoriaController.updateId
  );

  routes.delete(
    '/api/v1/categoria/:id',
    auth,
    categoriaRoles,
    CategoriaController.deleteId
  );

  routes.get('/api/v1/categoria/all', auth, CategoriaController.getAll);

  routes.get('/api/v1/categoria', auth, CategoriaController.getPagination);

  routes.get('/api/v1/categoria/:id', auth, CategoriaController.getId);

  routes.get(
    '/api/v1/categoria-check/:id',
    auth,
    CategoriaController.checkExist
  );

  routes.get(
    '/api/v1/categoria/proximo',
    auth,
    CategoriaController.proximoCodigo
  );
};
