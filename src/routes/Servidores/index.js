// Controller
import ServidoresController from '../../app/controllers/ServidoresController';

export default (routes, auth) => {
  // Routes Public
  routes.get('/api/v1/servidores/all', ServidoresController.getAll);

  // Routes Private

  routes.post('/api/v1/servidores', auth, ServidoresController.create);
  routes.delete('/api/v1/servidores/:id', auth, ServidoresController.delete);
  routes.put('/api/v1/servidores/:id', auth, ServidoresController.edit);
};
