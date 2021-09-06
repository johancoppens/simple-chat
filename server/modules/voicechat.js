/**
 * Ideas
 * Create a peer automatically upon login
 */

const attach = (agServer, socket) => {
  (async () => {
    // Set up a loop to handle and respond to the ping RPC.
    for await (let request of socket.procedure('voicechat/call')) {
      console.log(
        `Address ${request.data.caller} is calling ${request.data.callee}`,
      );
      /**
       * TODO: Create a caller peer in peerjs
       * TODO: Set timeout of x seconds to if the callee isn't answering
       */
    }
  })();

  (async () => {
    // Set up a loop to handle and respond to the ping RPC.
    for await (let request of socket.procedure('voicechat/accept')) {
      console.log(
        `Address ${request.data.callee} is accepting ${request.data.caller}`,
      );
      /**
       * TODO: Create a callee peer in peerjs
       * TODO: Handle WebRTC in the ui
       */
    }
  })();
};

exports.attach = attach;
