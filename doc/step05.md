# Authentication Flow

SocketCluster uses [JWT](https://jwt.io/) for authentication.

One could compare a JWT to as a passport in real life.

* It is issued and signed on the server.
* It contains data readable by anyone in possession of the JWT.
* Serve JWT's over HTTPS, so that no one can come into possession of it. After all, in real life it is also not recommended to lose your passport.
* The data on it cannot be changed. If one does this, the JWT is no longer valid.

## Simplified Socket Based Auth Flow

* User enters credentials in a login form.
* Credentials are send to the server via a RPC. (SocketCluster invoke > procedure)
* Server processes credentials. This can be done by checking these against a database for example.
* If this is successfull, we create a data structure with identity info and optional authorisation data like roles.
* Call setAuthToken on the server, which:
  * Creates and signs the JWT containing the data.
  * It attaches the JWT to the current connection. This is done automatically by SocketCluster.
* On the client we can watch the authStateChange event. In this event we can take appropriate actions like goto index on authenticated or goto signin on deauthenticated for example.
* Once authenticated, both on the server and client we can read the JWT's data (trough authToken property of the socket) to take further actions in our application based on the user's identity and his roles.

## Adding an Authentication Module on the Server

Create a file [server/modules/auth.js](../server/modules/auth.js) and attach it to the server like we did with pingpong.js in the previous step.

## Add Code to the Login Form on the Client

[ui/src/pages/Login.vue](../ui/src/pages/Login.vue)

## Update sc.js Boot File

Update [ui/src/boot/sc.js](ui/src/boot/sc.js) to react on the authState event and move the router accordingly.

## Examine our Implementation

To start fresh, stop the server by hitting Ctrl+c and restarting it again:

```bash
$ npm run start:watch

```

Goto your app in a new incognito window <http://localhost:8080>. The app redirects you to the login page http://localhost:8080/#/login.

Login with the default credentials presented.

If successful, you will be redirected to the chat page showing the user info.

Open developer tools in Chrome.

Goto Application > Storage > Local Storage > http://localhost:8080.

There you will see the JWT token under the socketcluster.authToken key.

Copy the token's value to the clipboard.

Goto [https://jwt.io/](https://jwt.io/) and paste it in the section "Encoded". What do you see?

Open a new browser tab and goto <http://localhost:8080/#/>

Open a new browser tab and goto <http://localhost:8080/#/login>

What is happening?

In the last browsertab manually navigate to <http://localhost:8080/#/login> by entering login after the root url. Click logout. Move to the other tabs and refresh the page. What is happening?

Look again for the socketcluster.authToken key in Local Storage.

Examine the values iat and exp by pasting it into <https://www.unixtimestamp.com/>

## Further Steps to Take to Improve our Implementation

For now, we are leaving our implementation as it is for simplicity. Later on we can improve it by thinking about:

* Dealing with expiration and renewal of the JWT token.
* Getting our user info from a real database, or possibly from another external system like Google OAuth for example.
* Provide a fixed auth key instead of a random one on the server. This will prevent JWT tokens from becoming invalid after a server crash/restart.
* Deauthenticate on the server, maybe implement a system to deauthenticate remote sessions.
* Pick up and react to authState events in other tabs by watching the localstorage socketcluster.authToken key with window.addEventListener('storage').
