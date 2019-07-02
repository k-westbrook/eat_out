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
    const guestCreated = await Guest.findOrCreate({
      where: {
        userId: userId
      },
      defaults: {
        email: email,
        isRegisteredUser: true
      }
    })

    await eventCreated.addGuest(guestCreated[0])

    res.status(201).send()
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

router.get('/getEvent/:eventId', async (req, res, next) => {
  try {
    const {userId, email} = req.session

    const guestFound = await Guest.findOne({
      where: {
        userId: userId
      }
    })

    const event = await Event.findOne({
      where: {id: req.params.eventId}
    })
    const guests = await event.getGuests()

    res.json({event, guests})
  } catch (err) {
    next(err)
  }
})

router.post('/addGuest/:eventId', async (req, res, next) => {
  try {
    const {userId} = req.session
    const {email} = req.body

    const userFound = await User.findOne({
      where: {
        email: email
      }
    })

    const guestCreated = await Guest.findOrCreate({
      where: {
        email: email
      },
      defaults: {
        email: email,
        isRegisteredUser: true,
        userId: userFound.id
      }
    })

    await GuestEvent.findOrCreate({
      where: {
        eventId: req.params.eventId,
        guestId: guestCreated[0].id
      },
      defaults: {
        eventId: req.params.eventId,
        guestId: guestCreated[0].id,
        isComing: true
      }
    })

    // res.json({event, guests})
  } catch (err) {
    next(err)
  }
})
