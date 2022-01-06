/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
import Sequelize from 'sequelize';

import Autores from '../app/models/Autores'
import Banimentos from '../app/models/Banimentos';
import Cargos from '../app/models/Cargos';
import Categoria from '../app/models/Categoria';
import Changelogs from '../app/models/Changelogs';
import Configuracoes from '../app/models/Configuracoes';
import Encurtador from '../app/models/Encurtador';
import Equipes from '../app/models/Equipes';
import HistoricoBanimentos from '../app/models/HistoricoBanimentos';
import LogsAccounts from '../app/models/LogsAccounts';
import Postagens from '../app/models/Postagens';
import PreUsers from '../app/models/PreUsers';
import Produtos from '../app/models/Produtos';
import Roles from '../app/models/Roles';
import Servidores from '../app/models/Servidores';
import Staffs from '../app/models/Staffs';
import Tokens from '../app/models/Tokens';
import Uploads from '../app/models/Uploads';
import UserRoles from '../app/models/UserRoles';
import UsersTokens from '../app/models/UsersTokens';
import Usuario from '../app/models/Usuario';
import databaseConfig from '../config/database';

const models = [Categoria, Autores, Usuario, Tokens, Roles, UserRoles, Uploads, PreUsers, Postagens,
  Cargos, Banimentos, HistoricoBanimentos, Configuracoes, Servidores, Produtos, Staffs, Changelogs,
  Encurtador, Equipes, LogsAccounts, UsersTokens];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB}`,
      { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
    );
  }
}

export default new Database();
