// Controller
import CommentsController from '../../app/controllers/PostCommentsController';

export default (routes, auth) => {
  // Routes Public

  // Routes Private

  routes.post('/api/v1/posts/comments', auth, CommentsController.createComment);
  routes.delete(
    '/api/v1/posts/comments/:id',
    auth,
    CommentsController.deleteComment
  );
  routes.put(
    '/api/v1/posts/comments/:id',
    auth,
    CommentsController.editComment
  );
  routes.put(
    '/api/v1/posts/comments/permission/:id',
    auth,
    CommentsController.toggleCommentsPermission
  );
};
