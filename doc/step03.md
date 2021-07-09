# Server Setup

For details see [SocketCluster](https://socketcluster.io/). Install this globally on your system if you haven't done this before:

```bash
$ npm install -g socketcluster

```

In the root project folder

```bash
$ socketcluster -v
v16.0.2
$ socketcluster create server
...
[Success] SocketCluster app "/home/johan/code/simple-chat/server" was setup successfully
...
$ cd server/
$ npm run start:watch

> socketcluster-sample@1.0.0 start:watch
> ./node_modules/nodemon/bin/nodemon.js server.js

[nodemon] 2.0.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
   [Active] SocketCluster worker with PID 2661309 is listening on port 8000
```

You can now go to <http://localhost:8000> to check if it is running.

What you see is the default app served from the public folder of your socketcluster installation.

Later on, we will replace this with the chat app build by quasar.
