const knex = require('knex')(require('../knexfile'))
;(async () => {

  const dbUser = await knex('users').where({
    'username': 'john.doe'
  }).debug()

  console.log(dbUser[0])
})()
