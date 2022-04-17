import MedalsController from '../../app/controllers/MedalsController';

export default (routes, auth) => {
  // Routes Private

  routes.get('/api/v1/medals/user/:username', MedalsController.getUserMedals);
  routes.get('/api/v1/medals/all/', MedalsController.getAllMedals);
  routes.get('/api/v1/medals/category/all/', MedalsController.getAllCategories);

  routes.post(
    '/api/v1/medals/category/create',
    auth,
    MedalsController.createMedalCategory
  );

  routes.post('/api/v1/medals/create', auth, MedalsController.createMedal);
};
