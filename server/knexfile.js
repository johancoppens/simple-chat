module.exports = {
  client: 'postgresql',
  connection: {
    host:     'localhost',
    port:     '5432',
    database: 'simple-chat',
    user:     'postgres',
    password: 'Pa55word'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/knex/migrations',
  },
  seeds: {
    directory: __dirname + '/knex/seeds',
  }
}

