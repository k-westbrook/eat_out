const User = require('./user')
const Event = require('./event')

User.belongsToMany(Event, {through: 'UserEvent'})
Event.belongsToMany(User, {through: 'UserEvent'})

module.exports = {
  User,
  Event
}
