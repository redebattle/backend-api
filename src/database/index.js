/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
import Sequelize from 'sequelize';

import Banimentos from '../app/models/bungee.models/Banimentos';
import HistoricoBanimentos from '../app/models/bungee.models/HistoricoBanimentos';
import Cargos from '../app/models/Cargos';
import ChangelogCategories from '../app/models/ChangelogCategories';
import ChangelogFeedbacks from '../app/models/ChangelogFeedbacks';
import ChangelogPosts from '../app/models/ChangelogPosts';
import Configuracoes from '../app/models/Configuracoes';
import Encurtador from '../app/models/Encurtador';
import Equipes from '../app/models/Equipes';
import Medals from '../app/models/Medals'
import MedalsCategories from '../app/models/MedalsCategories'
import MedalUser from '../app/models/MedalsUsers'
import PostArticle from '../app/models/PostArticle';
import PostCategory from '../app/models/PostCategory';
import PostComment from '../app/models/PostComment';
import PostReaction from '../app/models/PostReaction';
import PreRegistrations from '../app/models/PreRegistrations';
import Produtos from '../app/models/Produtos';
import Roles from '../app/models/Roles';
import Servers from '../app/models/Servers';
import Staffs from '../app/models/Staffs';
import Tickets from '../app/models/Tickets';
import TicketsCategories from '../app/models/TicketsCategories';
import TicketsPriorities from '../app/models/TicketsPriorities';
import TicketsStatus from '../app/models/TicketsStatus';
import TicketsThreads from '../app/models/TicketsThreads';
import Uploads from '../app/models/Uploads';
import UserRoles from '../app/models/UserRoles';
import Users from '../app/models/Users';
import UsersSessionLogs from '../app/models/UsersSessionLogs';
import UsersTokens from '../app/models/UsersTokens';
import databaseConfig from '../config/database';

const models = [
  Users, Roles, UserRoles, PreRegistrations, UsersSessionLogs, UsersTokens,
  PostArticle, PostCategory, PostComment, PostReaction,
  Uploads,
  Cargos, Servers, Produtos, Staffs, Encurtador, Equipes,
  Banimentos, HistoricoBanimentos,
  Configuracoes,
  ChangelogPosts, ChangelogCategories, ChangelogFeedbacks,
  Medals, MedalsCategories, MedalUser,
  Tickets, TicketsCategories, TicketsPriorities, TicketsStatus, TicketsThreads
];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
    this.connection.authenticate().then(() => {
    console.log('\nDatabase "Principal" conectada com sucesso!')
    }).catch((err) => {
      console.log(`\nOcorreu um erro ao conectar com a database "Principal". \nErro: ${err} \n`)
    } )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB}`,
      { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
    );
  }
}

export default new Database();
