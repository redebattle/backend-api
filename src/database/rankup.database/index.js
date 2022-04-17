/* eslint-disable prettier/prettier */
import Sequelize from 'sequelize';

// import Almas from '../../app/models/rankup.models/Almas'
// import Cash from '../../app/models/rankup.models/Cash'
// import Clans from '../../app/models/rankup.models/Clans'
// import ClansKills from '../../app/models/rankup.models/ClansKills'
// import ClansPlayers from '../../app/models/rankup.models/ClansPlayers'
// import DiscordHook from '../../app/models/rankup.models/DiscordHook'
// import Economy from '../../app/models/rankup.models/Economy'
// import Essentials from '../../app/models/rankup.models/Essentials'
// import Eventos from '../../app/models/rankup.models/Eventos'
// import EventosGuild from '../../app/models/rankup.models/EventosGuild'
// import EventosUsers from '../../app/models/rankup.models/EventosUsers'
// import Killsystem from '../../app/models/rankup.models/Killsystem'
// import Loja from '../../app/models/rankup.models/Loja'
// import Mina from '../../app/models/rankup.models/Mina'
// import Mito from '../../app/models/rankup.models/Mito'
// import nLogin from '../../app/models/rankup.models/nLogin'
import databaseConfig from '../../config/rankup.database';

const models = [
  // nLogin, Eventos, EventosUsers, EventosGuild, Economy, Mito, Cash,
  // Clans, ClansKills, ClansPlayers, Mina, Almas, Loja, Killsystem, DiscordHook, Essentials
];

class RankupDatabase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
    this.connection.authenticate().then(() => {
    console.log('\nDatabase "RankUP" conectada com sucesso!')

    }).catch((err) => {
      console.log(`\nOcorreu um erro ao conectar com a database "RankUP". \nErro: ${err} \n`)
    } )
  }
}

export default new RankupDatabase();
