const knex = require('knex')(require('../knexfile'));

const attach = (agServer, socket) => {
  (async () => {
    for await (let request of socket.procedure('users/all')) {
      console.log(
        `Login request from client ${socket.id}. Data: ${request.data}`,
      );
      try {
        request.end(await knex('users'));
      } catch (error) {
        request.end({ success: false, error });
      }
    }
  })();
};

exports.attach = attach;
