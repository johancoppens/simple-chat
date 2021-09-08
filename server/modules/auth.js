const ldposClient = require('ldpos-client');
const knex = require('knex')(require('../knexfile'));
const { blockchain } = require('../config.json');

const attach = (agServer, socket) => {
  const client = ldposClient.createClient(blockchain);

  (async () => {
    for await (let request of socket.procedure('login')) {
      (async () => {
        console.log(
          `Login request from client ${socket.id}. Data: ${request.data.passphrase}`,
        );
        try {
          /**
           * Verify if passphrase is valid
           */
          if (!client.validatePassphrase(request.data.passphrase))
            return request.end({ success: false, error: 'Invalid passphrase' });

          /**
           * Get client's address based on the passphrase
           */
          await client.connect({ passphrase: request.data.passphrase });
          const address = client.getWalletAddress();
          client.disconnect();

          /**
           * If username is provided in the request we need to register the user
           * If it isn't provided we need to get the user
           */
          let user;
          if (request.data.username) {
            user = {
              address,
              username: request.data.username,
            };

            await knex('users').insert(user);
          } else {
            user = await knex('users').where({ address }).first();

            /**
             * Check if user exists, if not we request the register form
             */
            if (!user) return request.end({ registerClient: true });
          }

          /**
           * Set auth token for user and end the request succesfully
           */
          if (user) {
            socket.setAuthToken(user);
            return request.end({ success: true });
          }
          request.end({ success: false });
        } catch (error) {
          request.end({ success: false, error });
        }
      })();
    }
  })();
};

exports.attach = attach;
