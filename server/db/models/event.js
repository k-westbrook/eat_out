const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.STRING
  },
  adminId: {
    type: Sequelize.INTEGER
  },
  location: {
    type: Sequelize.STRING
  },
  locationName: {
    type: Sequelize.STRING
  },
  passcode: {
    type: Sequelize.STRING
  }
})

module.exports = Event
