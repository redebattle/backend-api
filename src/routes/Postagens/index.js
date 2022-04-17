// Controller
import PostArticleController from '../../app/controllers/PostArticleController';

// Validação
import postagensRoles from '../../app/Roles/Postagens';
import PostagensCreate from '../../app/validators/Postagens/PostagensCreate';

// Permissões

export default (routes, auth) => {
  // Routes Public

  routes.get(
    '/api/v1/postagens/list',
    PostArticleController.getPaginationIndex
  );

  routes.get(
    '/api/v1/postagens/slug/:slug',
    PostArticleController.getSlugIndex
  );

  routes.get(
    '/api/v1/post/author/:author',
    PostArticleController.getAuthorPosts
  );

  // Routes Private

  // routes.get(
  //   '/api/v1/postagens/admin/all',
  //   auth,
  //   PostagensController.getAllAdmin
  // );

  // routes.get(
  //   '/api/v1/postagens/admin/list',
  //   auth,
  //   PostagensController.getPaginationAdmin
  // );

  routes.post(
    '/api/v1/post/article',
    auth,
    // postagensRoles,
    PostagensCreate,
    PostArticleController.createPost
  );

  // routes.delete(
  //   '/api/v1/postagens/:id',
  //   auth,
  //   // postagensRoles,
  //   PostagensController.deletePost
  // );

  // routes.put(
  //   '/api/v1/postagens/:id',
  //   auth,
  //   // postagensRoles,
  //   PostagensController.editPost
  // );

  // routes.put(
  //   '/api/v1/postagens/changeStatus/:id',
  //   auth,
  //   PostagensController.changeStatus
  // );
};
