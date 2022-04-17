// Controller
import ChangelogController from '../../app/controllers/ChangelogController';

export default (routes, auth) => {
  // Routes Public
  routes.get('/api/v1/changelog/all', ChangelogController.getAll);
  routes.get(
    '/api/v1/changelog/categories',
    ChangelogController.getAllCategories
  );
  routes.get('/api/v1/changelog/count', ChangelogController.count);

  // Routes Private

  routes.post('/api/v1/changelog', auth, ChangelogController.create);

  routes.put('/api/v1/changelog/:id', auth, ChangelogController.updateId);
  routes.delete('/api/v1/changelog/:id', auth, ChangelogController.deleteId);
};
