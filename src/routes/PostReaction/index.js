// Controller
import PostReactionsController from '../../app/controllers/PostReactionsController';

export default (routes, auth) => {
  // Routes Public

  // Routes Private

  routes.post(
    '/api/v1/posts/reactions/:post_id',
    auth,
    PostReactionsController.createReaction
  );
};
