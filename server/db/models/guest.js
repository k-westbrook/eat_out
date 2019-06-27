const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Guest = db.define('guest', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  isRegisteredUser: {
    type: Sequelize.BOOLEAN
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Guest
