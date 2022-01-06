// Controller
import MinecraftAPI from '../../app/controllers/MinecraftAPI';

export default (routes, auth) => {
  // Routes Public

  routes.get('/api/v1/api/server', MinecraftAPI.getOnlineServer);
  routes.get(
    '/api/v1/api/server/query',
    auth,
    MinecraftAPI.getOnlineServerQuery
  );
  routes.get('/api/v1/api/discord', MinecraftAPI.getOnlineDiscord);
  // routes.get('/api/skin', MinecraftAPI.getSkinName);
};
