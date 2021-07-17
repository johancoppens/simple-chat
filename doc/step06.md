# PostgreSQL Database

In this section, we are going to set up PostgreSQL for the database implementation using Docker during development.

## Install Docker

Install Docker from [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

## Building a Custom PostgreSQL Image

Create a [Dockerfile](../server/postgres/Dockerfile)

Build the custom image simple-chat-postgres-image.

```bash
$ cd server/postgres
$ docker build -t simple-chat-postgres-image .
...
Successfully tagged simple-chat-postgres-image:latest

```

## Run a Container Based on Our Custom Image

This command "installs" a container on your system based on our custom image.

```bash
$ docker run --restart always -d -p 5432:5432 --name simple-chat-postgres simple-chat-postgres-image
```

* --restart always: Always restart the container if it stops, also on system reboot. You can still manually stop/start.
* -d: Run in background
* -p 5432:5432 : Publish container's port 5432 to localhost's port 5432
* --name simple-chat: Assign simple-chat-postgres as the name for the container

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

If successful, we are basically ready to move on to the next part. Since we're going to be using [Knex.js](https://knexjs.org/) as an intermediate layer to access our database, we don't need to dig deeper into writing raw SQL queries.

Optionally, for reference, you can find more details about managing docker images and containers below.

## Manage Images

List images on our system

```bash
$ docker images
REPOSITORY                   TAG       IMAGE ID       CREATED          SIZE
simple-chat-postgres-image   latest    2fb03163471c   37 seconds ago   315MB
postgres                     13.3      eeb5ef226f19   4 days ago       315MB

```

Remove our image, in case we want to rebuild it e.g. when something went wrong. I think it's a good idea is to stop running containers based on this image first. (See later)

```
$ docker rmi simple-chat-postgres-image:latest
```

## Manage Containers

Manually stop|start|restart container simple-chat-postgres

```bash
$ docker stop|start|restart simple-chat-postgres

```

List all containers

```bash
$ docker ps -a
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS        PORTS                    NAMES
fa88bf79421d   simple-chat-postgres-image   "docker-entrypoint.s…"   39 seconds ago   Up 1 second   0.0.0.0:5432->5432/tcp   simple-chat-postgres

```

Remove container. The container must be stopped first. The container is removed from your system so all internal data will be lost!

```bash
$ docker rm simple-chat-postgres

```

## Notes

Is the container still running after a reboot of our system?

> Yes. Hence we used the `--restart always` flag when we issued `docker run`.

Where is my data?

> It is stored in the container and is preserved on restart and reboot. When you remove the container, the data is lost!

Can I run multiple containers simultaneously based on the same image?

> Yes. You only need to handle a different port mapping.

Why Docker for development?
> * Cross platform.
> * Switch easily between other versions of a system.
