import PostCategoryController from '../../app/controllers/PostCategoryController';
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
    PostCategoryController.createCategoria
  );

  routes.put(
    '/api/v1/categoria/:id',
    auth,
    categoriaRoles,
    validateCategoriaUpdate,
    PostCategoryController.updateId
  );

  routes.delete(
    '/api/v1/categoria/:id',
    auth,
    categoriaRoles,
    PostCategoryController.deleteId
  );

  routes.get('/api/v1/categoria/all', auth, PostCategoryController.getAll);

  routes.get('/api/v1/categoria', auth, PostCategoryController.getPagination);

  routes.get('/api/v1/categoria/:id', auth, PostCategoryController.getId);

  routes.get(
    '/api/v1/categoria-check/:id',
    auth,
    PostCategoryController.checkExist
  );

  routes.get(
    '/api/v1/categoria/proximo',
    auth,
    PostCategoryController.proximoCodigo
  );
};
