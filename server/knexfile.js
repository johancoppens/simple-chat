const { knex } = require('./config.json');

module.exports = {
  client: 'postgresql',
  connection: knex,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/knex/migrations',
  },
  seeds: {
    directory: __dirname + '/knex/seeds',
  },
};
