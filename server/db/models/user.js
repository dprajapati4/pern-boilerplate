const Sequelize = require('sequelize');
const db = require('../db');


// Simple model example
const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  }
})

module.exports = User

// Inlude Associations

// Include any instance methods

// Include any class Methods

// Hooks