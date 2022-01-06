import cargoController from '../../app/controllers/CargoController';
import validateCargoCreate from '../../app/validators/Cargos/CargosCreate';
import validateCargoUpdate from '../../app/validators/Cargos/CargosUpdate';

export default (routes, auth) => {
  routes.get('/api/v1/cargos/all', cargoController.getAll);

  routes.get('/api/v1/cargos', cargoController.getPagination);

  // routes.get('/cargos/:id', auth, cargoController.getId);

  // Routes Private

  routes.post(
    '/api/v1/cargos',
    auth,
    validateCargoCreate,
    cargoController.createCargo
  );

  routes.put(
    '/api/v1/cargos/:id',
    auth,
    validateCargoUpdate,
    cargoController.updateId
  );

  routes.delete('/api/v1/cargos/:id', auth, cargoController.deleteId);
};
