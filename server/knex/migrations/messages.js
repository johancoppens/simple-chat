exports.up = async (knex) => {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id') // Primary key
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.text('message')
    table.string('user') // The user that sended the message
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('messages')
}
