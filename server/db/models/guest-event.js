const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const GuestEvent = db.define('GuestEvent', {
  isComing: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = GuestEvent
