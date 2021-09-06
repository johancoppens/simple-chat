exports.seed = async (knex) => {
  await knex('users').del()
  await knex('users').insert([
    // enable network ramp play luxury output purchase town excess uncle cash code
    { address: 'clsk74ff6b9d692ceaae69dbd13b68e99d649c6f1d64', username: 'tester'},
    // wave lunch legend attitude stomach unusual mammal suggest point snake mass crazy
    { address: 'clskc2017f03c4c326663ca674786f4ccafb95c0f179', username: 'john doe'},
    // foil caution high catalog exchange shadow dad job adult loud able gate
    { address: 'clsk9df1cdfe0aa846be05974a6b285722edb8676347', username: 'woop woop'}
  ])
}
