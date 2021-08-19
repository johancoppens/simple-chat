# Chat Fun!

Believe it or not, with barely 150 lines of code we are going to make this:

![simple-chat](assets/simple-chat640.apng)

This includes:

* Making a simple Chat user interface using components of the Quasar Framework.
  * Transitions
  * Infinite scroll implementation to load older history messages on scroll.
* Learn to make use of the new Vue v3 [composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api)
* Implementation of Socketcluster's pub/sub functionality, so a user can send and receive messages respectively to and from all other connected users.
* Some resize code to layout the components like we want.
* Adding some CSS to style scrollbars

## Adding an Extra User

To make it a bit more realistic, we are going to add 3 users to the database using knex migrations.

Edit the file [server/knex/seeds/users.js](../server/knex/seeds/users.js)

And seed the database to add the 3 users

```bash
$ knex seed:run
Ran 1 seed files
```

## Chat UI

[ui/src/pages/Chat.vue](../ui/src/pages/Chat.vue)

To display the logged user in the header of the app, we also make some changes to [ui/src/layouts/MainLayout.vue](../ui/src/layouts/MainLayout.vue)

## Server

We don't have to do anything here :-). Of course we have to do things on the server later on if we want to store a history of messages in the database.

## Test

Open 2 browsers sessions of which one in incognito mode to [http://localhost:8080/#/](http://localhost:8080/#/)

Open another browser session on another machine or mobile phone on your local network to http://[ip-dev-machine]:8080/#. (See note below)

Login with a different user on each session, and start chatting!

## Notes

Set correct ip of your dev machine in [ui/src/boot/sc.js](../ui/src/boot/sc.js) if you want to test on a different machine then dev. e.g. to test on mobile.

```js
...
const socket = client.create({
  // hostname: 'localhost',
  hostname: '192.168.0.30', // Change this to the IP address of your dev computer if you want to test the app on another machine or mobile phone
  port: 8000
})
...

```
