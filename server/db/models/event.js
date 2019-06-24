const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE
  },
  time: {
    type: Sequelize.TIME
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
    type: Sequelize.STRING,
    set() {
      let value = Math.random()
        .toString(36)
        .substring(9, 13)
      this.setDataValue('name', value)
    }
  }
})

module.exports = Event
