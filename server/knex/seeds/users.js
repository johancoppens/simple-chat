exports.seed = async (knex) => {
  await knex('users').del()
  await knex('users').insert([
    { username: 'john.doe', password: 'Pa55word'},
    { username: 'jane.roe', password: 'Pa55word'},
    { username: 'james.doe', password: 'Pa55word'}
  ])
}
