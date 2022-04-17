import LivestreamController from '../../app/controllers/LivestreamController';

export default (routes) => {
  // Routes Private

  routes.post('/api/v1/livestream/', LivestreamController.getLive);
};
