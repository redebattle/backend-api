// Controller
import DashboardController from '../../app/controllers/DashboardController';

export default (routes, auth) => {
  routes.get('/api/v1/dashboard', auth, DashboardController.index);
};
