require('../bootstrap');

const TIMEZONE = 'America/Sao_Paulo';

module.exports = {
  host: process.env.DB_HOST_RANKUP,
  username: process.env.DB_USER_RANKUP,
  password: process.env.DB_PASS_RANKUP,
  database: process.env.DB_NAME_RANKUP,
  dialect: 'mariadb',
  port: 3306,
  dialectOptions: {
    timezone: TIMEZONE,
  },
  storage: './__tests__/database.sqlite',

  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    timestamps: false,
  },
  benchmark: false,
  logging: false,
};
