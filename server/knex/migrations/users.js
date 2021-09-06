
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.string('address').primary()
    table.string('username').notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('users')
}
