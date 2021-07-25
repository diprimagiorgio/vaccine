[![Node.js CI](https://github.com/diprimagiorgio/vaccine-exercise-2021/actions/workflows/node.js.yml/badge.svg)](https://github.com/diprimagiorgio/vaccine-exercise-2021/actions/workflows/node.js.yml)

# Vaccine-exercise-2021

Possible solution to solita [vaccination-exercise](https://github.com/solita/vaccine-exercise-2021).

[Visit the dashboard](https//:google.com)

## Introduction

This repository contains my solution to THL order. I have realized a server that manage the database, with the vaccination data, and give access to some useful data througt API. The API are used by a webpage that creates a report where the user has  a clear visualization of the data in the database.

## Technologies

### Client
This web app is based on the ReactJS framework. The project was bootstrap with [Create react app](https://github.com/facebook/create-react-app).
I have used [react boostrap](https://react-bootstrap.github.io/) and the library used to show plots is [D3.js](https://d3js.org/)

### Server
The server is based on [Express.js](https://expressjs.com/) framework for Node.js. The project was bootstrapped with [express generator](https://expressjs.com/en/starter/generator.html)

The [Postgres]() database is a created and managed with [sequelize](https://sequelize.org/). 

The API are tested with [jest](https://jestjs.io/) Javascript testing framework

## Development
### Local Dev

Create a postgres database connection string.

#### Method 1 - Locally
Install Postgress locally open a terminal and run the command below.
```bash
$ createdb dev_db -U <db_user>
$ createdb test_db -U <db_user>
```
Now, create a .env file and set the variable
```diff
DATABASE_URL=
DEV_DATABASE_URL=postgres://<db_user>:<db_password>@127.0.0.1:5432/dev_db
TEST_DATABASE_URL=postgres://<db_user>:<db_password>@127.0.0.1:5432/test_db
```

#### Method 2 - ElephantSQL

If you don't want to use a local installation you can use [ElephantSQL](https://www.elephantsql.com/).

Create a .env file with the connections string.


Initialize the database and load some example data.
```bash
$ cd src/server
$ npm run migrate
$ npm run seed
```

Install and start the server
```bash
$ cd src/server
$ npm install
$ npm run start
```
Install and start the client 
```bash
$ cd src/client
$ yarn install
$ yarn start
```
### Local Prod

Install all dependencies and build
```bash
$ yarn install
$ yarn build
```

## CI/CD

I have used github action to implement continuous integration (CI). Every time I push my code, I test the server side with jest by checking the database creation and the seeding on a test db. After that I check if the result from the API match the result published[ by solita](https://github.com/solita/vaccine-exercise-2021#some-numbers-to-help-you)
