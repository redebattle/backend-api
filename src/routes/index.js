/* eslint-disable import/no-unresolved */
import { Router } from 'express';

// Middlewares
import authMiddleware from '../app/middleware/auth';
import manutencaoMiddleware from '../app/middleware/maintenance';

// Pastas das Rotas
import BanimentosRoute from './Banimentos';
import CargosRoute from './Cargos';
import CategoriasRoute from './Categorias';
import ChangelogRoute from './Changelog';
import ConfiguracoesRoute from './Configuracoes';
import DashboardRoutes from './Dashboard';
import EncurtadorRoute from './Encurtador';
import EquipeRoute from './Equipe';
import LivestreamsRoute from './Livestreams';
import MedalsRoute from './Medals';
import MinecraftAPI from './MinecraftAPI';
import PostagensRoute from './Postagens';
import PostCommentRoute from './PostComment';
import PostReactionRoute from './PostReaction';
import ProdutosRoute from './Produtos';
import ReportsRoute from './Reports';
import RolesRoute from './Roles';
import ServidoresRoute from './Servidores';
import TicketsRoute from './Tickets';
import UploadsRoute from './Uploads';
import UsersRoute from './Usuarios';

const routes = new Router();

UsersRoute(routes, authMiddleware, manutencaoMiddleware);
ReportsRoute(routes, authMiddleware, manutencaoMiddleware);
RolesRoute(routes, authMiddleware, manutencaoMiddleware);
CategoriasRoute(routes, authMiddleware, manutencaoMiddleware);
UploadsRoute(routes, authMiddleware, manutencaoMiddleware);
PostagensRoute(routes, authMiddleware, manutencaoMiddleware);
CargosRoute(routes, authMiddleware, manutencaoMiddleware);
CargosRoute(routes, authMiddleware, manutencaoMiddleware);
BanimentosRoute(routes, authMiddleware, manutencaoMiddleware);
MinecraftAPI(routes, authMiddleware, manutencaoMiddleware);
ProdutosRoute(routes, authMiddleware, manutencaoMiddleware);
ServidoresRoute(routes, authMiddleware, manutencaoMiddleware);
EquipeRoute(routes, authMiddleware, manutencaoMiddleware);
ChangelogRoute(routes, authMiddleware, manutencaoMiddleware);
EncurtadorRoute(routes, authMiddleware, manutencaoMiddleware);
ConfiguracoesRoute(routes, authMiddleware, manutencaoMiddleware);
TicketsRoute(routes, authMiddleware, manutencaoMiddleware);
DashboardRoutes(routes, authMiddleware, manutencaoMiddleware);
PostCommentRoute(routes, authMiddleware, manutencaoMiddleware);
PostReactionRoute(routes, authMiddleware, manutencaoMiddleware);
MedalsRoute(routes, authMiddleware, manutencaoMiddleware);
LivestreamsRoute(routes, authMiddleware, manutencaoMiddleware);

routes.get('*', (req, res) =>
  res.json({
    title: 'BattleAPI',
    version: `${process.env.VERSION}`,
    status: 'OK',
    runtime_mode: `${process.env.NODE_ENV}`,
  })
);

export default routes;
