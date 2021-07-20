require('dotenv').config()

module.exports = {
  define: {
    timestamps: false
  },
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}
// I want to add a column doses left and every time I do an insert a trugger will update the value doses_left -= 1
// And I will inssert a check doses_left >= 0 all this step have to be in a transactino with a rollback in case the chack fails