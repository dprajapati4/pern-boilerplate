const Sequelize = require('sequelize')

// Port 5432 is postgre's default port you dont need to change this

// If using Heroku, sequelize will use the Heroku postgres url if not then it will use your local db url
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432:**yourdbname**', {
  logging: false // unless you like the logs
});

module.exports = db;