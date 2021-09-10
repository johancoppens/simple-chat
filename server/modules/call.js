/**
 * Ideas
 * Create a peer automatically upon login
 */

const attach = (agServer, socket) => {
  (async () => {
    // Set up a loop to handle and respond to the ping RPC.
    for await (const request of socket.procedure('call/dial')) {
      console.log(request.data);
      /**
       * TODO: Create a caller peer in peerjs
       * TODO: Set timeout of x seconds to if the callee isn't answering
       */
      request.end('received');
    }
  })();

  (async () => {
    // Set up a loop to handle and respond to the ping RPC.
    for await (const request of socket.procedure('call/accept')) {
      console.log(request.data);
      /**
       * TODO: Create a callee peer in peerjs
       * TODO: Handle WebRTC in the ui
       */
      request.end('received');
    }
  })();
};

exports.attach = attach;
