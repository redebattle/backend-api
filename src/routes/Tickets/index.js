// Controller
import TicketsControllers from '../../app/controllers/TicketsControllers';

// Validação

// Permissões

export default (routes, auth) => {
  // Routes Public

  routes.get('/api/v1/tickets', TicketsControllers.getTickets);
  routes.get('/api/v1/tickets/:id', TicketsControllers.getTicketsByID);
};
