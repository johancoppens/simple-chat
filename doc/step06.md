# PostgreSQL Database

In this section, we are going to set up PostgreSQL for the database implementation using Docker during development.

## Install Docker and Compose

Install Docker from [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).

Install Compose [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/). On Windows this is already included in Docker Desktop for Windows.

## Use docker-compose for Running both PostgreSQL ans PGAdmin

Create a file [server/postgres/docker-compose.yml](../server/postgres/docker-compose.yml)

Add a line under de scripts section in [server/package.json](../server/package.json)

```json
"scripts": {
    ...
    "start:db": "docker-compose -f ./postgres/docker-compose.yml up"
  }

```

Run the script in the server directory.

```bash
$ npm run start:db
```

The first time we run this script

* Both the `postgres:13.3` and `dpage/pgadmin4` images are downloaded from (https://hub.docker.com/).

* The docker-compose.yml is processed and the containers specified are configured.

* Containers are started

Now we can go to (http://localhost:8081/) to login to the PGAdmin console.

Login with `localuser@example.org` and `Pa55word` like specified in the `docker-compose.yml` file.

In PGAdmin:

* Click Add New Server > General Tab
  * Name: localpg
* Click Connection tab
  * Host name/address: localpg
  * Port: 5432
  * Username: postgres
  * Password: Pa55word

Note that from the PGAdmin's view, which runs in a docker container, the host for the PostgreSQL server is `localpg` and not `localhost`!

We can stop PostgreSQL and PGAdmin by hitting Ctrl+C

On subsequent runs, only the containers are restarted. Data will be preserved unless we delete the containers manually. See further.

## Test Access ;-) to our Database in NodeJS

Install pg npm package on the server

```bash
$ cd server
$ npm install --save pg
```

Create a file [server/postgres/connection-test.js](../server/postgres/connection-test.js).

Run the script

```bash
$ node connection-test.js 
Hello world!
```

If successful, we are basically ready to move on to the next step. Since we're going to be using [Knex.js](https://knexjs.org/) as an intermediate layer to access our database, we don't need to dig deeper into writing raw SQL queries.

Optionally, for reference, you can find more details about managing docker images and containers below.

## Manage Images

List images on our system

```bash
$ docker images
REPOSITORY       TAG       IMAGE ID       CREATED       SIZE
postgres         13.3      eeb5ef226f19   9 days ago    315MB
dpage/pgadmin4   latest    20cef76099fd   10 days ago   249MB

```

Remove an image

```
$ docker rmi postgres:13.3
```

## Manage Containers

Manually stop|start|restart container simple-chat-postgres

```bash
$ docker stop|start|restart postgres

```

List all containers

```bash
$ docker ps -a
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                                                        NAMES
f25de377610f   dpage/pgadmin4   "/entrypoint.sh"         33 minutes ago   Up 33 minutes   80/tcp, 443/tcp, 0.0.0.0:8081->8081/tcp, :::8081->8081/tcp   postgres_pgadmin_1
823440e786c7   postgres:13.3    "docker-entrypoint.s…"   35 minutes ago   Up 33 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp                    postgres_db

```

Remove container. The container must be stopped first. The container is removed from your system so all internal data will be lost!

```bash
$ docker rm postgres_db

```
