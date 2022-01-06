import AutoresController from '../../app/controllers/AutoresController';
import AutorRoles from '../../app/Roles/Autor';
import validateAutoresCreate from '../../app/validators/Autores/AutoresCreate';
import validateAutoresUpdate from '../../app/validators/Autores/AutoresUpdate';

export default (routes, auth) => {
  routes.get('/api/v1/autor/all', AutoresController.getAll);

  routes.get('/api/v1/autor', AutoresController.getPagination);

  routes.get('/api/v1/autor/:id', AutoresController.getId);

  // Routes Private

  routes.post(
    '/api/v1/autor',
    auth,
    AutorRoles,
    validateAutoresCreate,
    AutoresController.createAutores
  );

  routes.put(
    '/api/v1/autor/:id',
    auth,
    AutorRoles,
    validateAutoresUpdate,
    AutoresController.updateAutores
  );

  routes.delete(
    '/api/v1/autor/:id',
    auth,
    AutorRoles,
    AutoresController.deleteAutor
  );
};
