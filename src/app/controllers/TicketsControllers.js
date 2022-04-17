import Servers from '../models/Servers';
import Tickets from '../models/Tickets';
import TicketsCategories from '../models/TicketsCategories';
import TicketsPriorities from '../models/TicketsPriorities';
import TicketsStatus from '../models/TicketsStatus';
import TicketsThreads from '../models/TicketsThreads';
import Uploads from '../models/Uploads';
import Users from '../models/Users';

class TicketsController {
  async getTickets(req, res) {
    try {
      const ticket = await Tickets.findByPk(1, {
        attributes: {
          exclude: [
            'author_id',
            'category_id',
            'priority_id',
            'status_id',
            'attachment_id',
            'server_id',
          ],
        },
        include: [
          {
            model: Users,
            as: 'author',
            attributes: {
              exclude: ['password_hash', 'refresh_token', 'token_expires_date'],
            },
          },
          {
            model: TicketsCategories,
            as: 'category',
          },
          {
            model: TicketsStatus,
            as: 'status',
          },
          {
            model: TicketsPriorities,
            as: 'priority',
          },
          {
            model: Servers,
            as: 'server',
          },
          {
            model: Uploads,
            as: 'attachment',
            attributes: {
              exclude: ['name', 'size'],
            },
          },
        ],
      });
      const ticketsThreads = await TicketsThreads.findAll({
        where: {
          ticket_id: ticket.id,
        },
        order: [['createdAt', 'asc']],
        include: [
          {
            model: Users,
            as: 'user',
            attributes: {
              exclude: ['password_hash', 'refresh_token', 'token_expires_date'],
            },
          },
        ],
      });
      return res.json({ ticket, threads: ticketsThreads });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async getTicketsByID(req, res) {
    try {
      const { id } = req.params;
      const ticket = await Tickets.findByPk(id, {
        attributes: {
          exclude: [
            'author_id',
            'category_id',
            'priority_id',
            'status_id',
            'attachment_id',
            'server_id',
          ],
        },
        include: [
          {
            model: Users,
            as: 'author',
            attributes: {
              exclude: ['password_hash', 'refresh_token', 'token_expires_date'],
            },
          },
          {
            model: TicketsCategories,
            as: 'category',
          },
          {
            model: TicketsStatus,
            as: 'status',
          },
          {
            model: TicketsPriorities,
            as: 'priority',
          },
          {
            model: Servers,
            as: 'server',
          },
          {
            model: Uploads,
            as: 'attachment',
            attributes: {
              exclude: ['name', 'size'],
            },
          },
        ],
      });
      if (!ticket) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: 'Ticket não encontrado.',
          details: null,
        });
      }
      const ticketsThreads = await TicketsThreads.findAll({
        where: {
          ticket_id: ticket.id,
        },
        order: [['createdAt', 'asc']],
        include: [
          {
            model: Users,
            as: 'user',
            attributes: {
              exclude: ['password_hash', 'refresh_token', 'token_expires_date'],
            },
          },
        ],
      });
      return res.json({ ticket, threads: ticketsThreads });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }
}

export default new TicketsController();
