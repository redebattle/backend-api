import RolesController from '../../app/controllers/RolesController';
import AdminOnly from '../../app/Roles/AdminOnly';
import validateGiveRoles from '../../app/validators/Roles/giveRoles';
import validateRemoveRoles from '../../app/validators/Roles/removeRoles';

export default (routes, auth) => {
  // Routes Private

  routes.get('/api/v1/roles/all', auth, AdminOnly, RolesController.getAllRoles);

  routes.get(
    '/api/v1/roles',
    auth,
    AdminOnly,
    RolesController.getUserRoleSearch
  );

  routes.get(
    '/api/v1/roles/admin/get',
    auth,
    AdminOnly,
    RolesController.getUserRoles
  );

  routes.post(
    '/api/v1/roles',
    auth,
    AdminOnly,
    validateGiveRoles,
    RolesController.giveRoleUser
  );

  routes.delete(
    '/api/v1/roles',
    auth,
    AdminOnly,
    validateRemoveRoles,
    RolesController.removeRoleUser
  );
};
