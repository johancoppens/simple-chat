# KnexJS Integration

## Installation

In the server directory:
```bash
$ npm install --save knex

```
Since we also want to use the migration and seeding functionality from knex, we also install the knex CLI globally:

```bash
$ npm install knex -g

```

## About Migrations and Seedings

Migrations are about defining the database structure. Maybe it seems overkill at first glance, but it's a good idea to have it. It allows, during development, to discard your data structure and redefine it again in a fast way. Also co-devs can bring the database in a certain state to go further during development time, e.g keep our database structure in sync with our git flow. And finally, we can also use it to provision our production database.

About seedings the same advantages apply, but then we talk about provisioning our database with sample data during dev time.

And we can all define it in javascript, our favorite language, thanks to knex.

## The Users Table

Let's keep it simple for now. All we're gonna do now is hook up our authentication mechanism to our database by creating a users table and provide it with some sample data.

### Creating a Knex File

In the server directory

```bash
$ knex init
Created ./knexfile.js

```

And for simplicity we edit it like this [server/knexfile.js](../server/knexfile.js)

### Creating the Users Table Using Migrations

Create a file[/server/knex/migrations/users.js](../server/knex/migrations/users.js)

This file contains two exported functions, up and down, which we can populate with javascript code for table creation and deletion.

Run the migration

```bash
$ knex migrate:up
Batch 1 ran the following migrations:
users.js

```

If we go to PGAdmin we will see the users table created under Databases > simple-chat > Schemas > public > Tables.

To delete the users table:

```bash
$ knex migrate:down
Batch 1 rolled back the following migrations:
users.js

```

### Seeding Some Sample Data in the Users Table

Create a file [server/knex/seeds/users.js](../server/knex/seeds/users.js)

Run the seeding:

```bash
$ knex seed:run
Ran 1 seed files
```

### Hook Up simple-chat App Authentication to the Users Table

We only need to change the [server/modules/auth.js](../server/modules/auth.js) file and reimplement the verifyUser function so the user is checked against the users table.

Test the new login method by trying to login from simple-chat.
