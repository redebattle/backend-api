// Controller
import nLoginController from '../../app/controllers/bungee.controllers/nLoginController';
import ReportsController from '../../app/controllers/bungee.controllers/ReportsController';
import SessionMinecraftController from '../../app/controllers/SessionMinecraftController';

export default (routes) => {
  routes.get('/api/v1/reports/all', ReportsController.getall);
  routes.get('/api/v1/reports/:id', ReportsController.getByID);
  routes.get('/api/v1/reports/user/:uuid', ReportsController.getUserByUUID);
  routes.post('/api/v1/teste', SessionMinecraftController.createSession);
};
