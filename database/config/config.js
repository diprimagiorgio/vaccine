require('dotenv').config()
// TODO:I have to use enviromental variable 
module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: '',
    dialect: 'postgres',
  },
}
