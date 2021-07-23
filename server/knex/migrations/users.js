
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.string('username').primary()
    table.string('password').notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('users')
}
