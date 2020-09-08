## Description

Coffee Api for NestJs Offical Course.  I use pnpm so i dont have an xplosion of node modules files every where. 

## Postgres Docker config pgadmin added.
```bash
version: "3"
services:
  db:
    image:  postgres
    restart: always 
    ports:
      - "5432:5432"
    environment:
       POSTGRES_PASSWORD: neverusedinproduction
  pgadmin:
    image: dpage/pgadmin4
    restart: always
    environment: 
        PGADMIN_DEFAULT_EMAIL: blackstag@gmail.com
        PGADMIN_DEFAULT_PASSWORD: password
        PGADMIN_LISTEN_PORT: 8080
    ports:
        - 8080:8080
    links:
        - "db:pgsql-server"
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
