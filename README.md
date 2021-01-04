localsoft
=========

Software for small organizations doing organizing work.

This is not open source, though the source is open to inspect.

&copy; Tristan McNab 2018+

Helpful Commands
----------------
- `npx prisma db push --preview-feature` to sync your schema with your local database
- `npx prisma format` to reformat your schema
- `npx prisma generate` to regenerate the prisma client when you make a change to the schema
- `npx prisma studio` to muck with model data in development

Setup
-----
- Assumes you're using postgresapp
- Create `/.env` with the following content (where `USERNAME` is your local account's username, obviously):
```
DATABASE_URL=postgresql://USERNAME@localhost/USERNAME
```