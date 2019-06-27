const router = require('express').Router()
const {Event, User, Guest, GuestEvent} = require('../db/models')
module.exports = router

router.post('/addEvent', async (req, res, next) => {
  try {
    const {userId, email} = req.session
    const {eventName, locationName, location, date, time} = req.body
    let passcode = Math.random()
      .toString(36)
      .substring(9, 13)
    const eventCreated = await Event.create({
      name: eventName,
      date,
      time,
      location,
      locationName,
      adminId: userId,
      passcode
    })
    const guestCreated = await Guest.create({
      userId: userId,
      email: email,
      isRegisteredUser: true
    })

    const eventReturned = await guestCreated.addEvent(eventCreated)

    res.json(eventReturned)
  } catch (err) {
    next(err)
  }
})

router.get('/getEventList', async (req, res, next) => {
  try {
    const {userId, email} = req.session

    const guestFound = await Guest.findOne({
      where: {
        userId: userId
      }
    })

    const eventsFound = await guestFound.getEvents()

    res.json(eventsFound)
  } catch (err) {
    next(err)
  }
})
