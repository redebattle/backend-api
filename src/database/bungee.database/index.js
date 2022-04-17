/* eslint-disable prettier/prettier */
import Sequelize from 'sequelize';

import Banimentos from '../../app/models/bungee.models/Banimentos';
import HistoricoBanimentos from '../../app/models/bungee.models/HistoricoBanimentos';
import Reports from '../../app/models/bungee.models/Reports';
import ReportsComments from '../../app/models/bungee.models/ReportsComments';
import ReportsUsers from '../../app/models/bungee.models/ReportsUsers';
import databaseConfig from '../../config/bungee.database';

const models = [
  Banimentos, HistoricoBanimentos, Reports, ReportsUsers, ReportsComments
];

class BungeeDatabase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
    this.connection.authenticate().then(() => {
    console.log('\nDatabase "Bungee" conectada com sucesso!')

    }).catch((err) => {
      console.log(`\nOcorreu um erro ao conectar com a database "Bungee". \nErro: ${err} \n`)
    } )
  }
}

export default new BungeeDatabase();
