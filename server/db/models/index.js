const User = require('./user')
const Event = require('./event')
const Guest = require('./guest')
const GuestEvent = require('./guest-event')

Guest.belongsToMany(Event, {through: GuestEvent})
Event.belongsToMany(Guest, {through: GuestEvent})

module.exports = {
  User,
  Event,
  Guest,
  GuestEvent
}
