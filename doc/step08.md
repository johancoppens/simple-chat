# Chat Fun!

First implementation of chat with Socketcluster's pub/sub functionality.

```
$ knex seed:run
```
to add extra user

3 users

john.doe, jane.roe, james.doe

Note: set correct ip of dev machine in ui/src/boot/sc.js if you want to test on a different machine then dev. e.g. to test on mobile

```js
const socket = client.create({
  hostname: '192.168.0.30', /
  port: 8000
})


```

## Chat UI

Mobile
