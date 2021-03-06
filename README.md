# simple-chat

WIP

We're going to build something like this:

![simple-chat](doc/assets/simple-chat640.apng)

The goal of this project is twofold:

* Started as a Proof of Concept for <https://github.com/Capitalisk/ldpos-chat>.
* Discovering technologies related to building modern realtime web applications.

Technologies used:

* [Vue.js 3](https://v3.vuejs.org/)
* [Quasar Framwork](https://quasar.dev/)
* [SocketCluster](https://socketcluster.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Knex.js](https://knexjs.org/)

This project is built up in several steps. Each step has its own documentation that you can find in the [docs](https://github.com/johancoppens/simple-chat/tree/master/doc) folder. To follow along, a git tag has been created for each step. To set the state of your local repo to the according step, you can use:

```bash
$ git checkout step<xx>
```

## Steps

* [Setup Quasar Project](doc/step01.md)
* [Customize Default UI](doc/step02.md)
* [Server Setup](doc/step03.md)
* [Hook up our UI to the Server](doc/step04.md)
* [Authentication Flow](doc/step05.md)
* [PostgreSQL Database](doc/step06.md)
* [KnexJS Integration](doc/step07.md)
* [Chat with Pub/Sub](doc/step08.md)
* [Implement Database History](doc/step09.md)

## TODO

* Implement public group channels, maybe something like Twitter with # and @?
* Private peer to peer video call over WebRTC [PeerJS](https://peerjs.com/)
* Private chat and data exchange over WebRTC
* ...
