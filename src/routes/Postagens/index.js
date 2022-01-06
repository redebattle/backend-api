// Controller
import PostagensController from '../../app/controllers/PostagensController';

// Validação
import postagensRoles from '../../app/Roles/Postagens';
import PostagensCreate from '../../app/validators/Postagens/PostagensCreate';

// Permissões

export default (routes, auth) => {
  // Routes Public

  routes.get('/api/v1/postagens/all', PostagensController.getAllIndex);
  routes.get('/api/v1/postagens/list', PostagensController.getPaginationIndex);
  routes.get('/api/v1/postagens/:id', PostagensController.getIdIndex);
  routes.get('/api/v1/postagens', PostagensController.searchIndex);
  routes.get('/api/v1/postagens/slug/:slug', PostagensController.getSlugIndex);

  // Routes Private

  routes.get(
    '/api/v1/postagens/admin/all',
    auth,
    PostagensController.getAllAdmin
  );

  routes.get(
    '/api/v1/postagens/admin/list',
    auth,
    PostagensController.getPaginationAdmin
  );

  routes.get(
    '/api/v1/postagens/admin/:id',
    auth,
    PostagensController.getIdAdmin
  );

  routes.post(
    '/api/v1/postagens',
    auth,
    // postagensRoles,
    PostagensCreate,
    PostagensController.createPost
  );

  routes.delete(
    '/api/v1/postagens/:id',
    auth,
    // postagensRoles,
    PostagensController.deletePost
  );

  routes.put(
    '/api/v1/postagens/:id',
    auth,
    // postagensRoles,
    PostagensController.editPost
  );

  routes.put(
    '/api/v1/postagens/changeStatus/:id',
    auth,
    PostagensController.changeStatus
  );
};
