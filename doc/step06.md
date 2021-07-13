# PostgreSQL Database

## Running PostgreSQL on Docker for Development

Install docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

Create a directory to store database [project_folder]/postgres



Run PostgreSQL version 13.3 on docker

```bash
$ docker run -d --name dev-postgres -e POSTGRES_PASSWORD=Pa55word -v ~/code/simple-chat/postgres/:/var/lib/postgresql/data -p 5432:5432 postgres:13.3
```