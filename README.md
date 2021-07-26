[![Azure App Service - vaccine-solita(Production), Build and deploy NodeJS app](https://github.com/diprimagiorgio/vaccine-exercise-2021/actions/workflows/main_vaccine-solita.yml/badge.svg)](https://github.com/diprimagiorgio/vaccine-exercise-2021/actions/workflows/main_vaccine-solita.yml)

# Vaccine-exercise-2021

A Possible solution to solita [vaccination exercise](https://github.com/solita/vaccine-exercise-2021).

Here you can [visit the dashboard](https://vaccine-solita.azurewebsites.net/) and check the final result

## Introduction

This repository contains my solution to THL order. I have realized a server that manages the database, with the vaccination data, and gives access to some useful data through APIs. APIs are used by a webpage that creates a report where the user has a graphical visualization of the data in the database.


## Technologies

### Client
This web app is based on the ReactJS framework. The project was bootstrapped with the[Create react app](https://github.com/facebook/create-react-app).
I have used [react boostrap](https://react-bootstrap.github.io/) and the library used to show plots is [D3.js](https://d3js.org/)

### Server
The server is based on [Express.js](https://expressjs.com/) framework for Node.js. The project was bootstrapped with [express generator](https://expressjs.com/en/starter/generator.html)

The [Postgres](https://www.postgresql.org/) database is created and managed with [sequelize](https://sequelize.org/). 

The APIs are tested with:  [jest](https://jestjs.io/) Javascript testing framework.

## Development

### Setting up db
Create a postgres database connection string.

#### Method 1 - Locally
Install Postgress locally, open a terminal and run the command below.
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

### Building

We need to install the project dependencies and building the react app
```bash
$ npm run build
```
Now we need to install the project dependencies of the server
```bash
$ npm install
```

### Database creation and seeding

We need to create the database structure (tables and functions for triggers) and provide the database seeding, this step requires a few minutes.
```bash
$ npm run migrate
$ npm run seed
```

### Testing and running the app
Now we can test the app, the test is going to use a different database.
```bash
$ npm run test
```
And the final step is starting our app, that now is accessible at http://localhost:3000
```bash
$ npm run start
```






## CI/CD

I have used github action to implement continuous integration (CI) and I have automated the workflow to deploy Azure Web Apps. Every time I push my code, I test the server side with jest by checking the database creation and the seeding on a test db. After that I check if the result from the API matches the [result published](https://github.com/solita/vaccine-exercise-2021#some-numbers-to-help-you) by solita, if everything works fine the result is deploy and the new version is accessible [here](https://vaccine-solita.azurewebsites.net/)
