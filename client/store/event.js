import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_EVENT = 'ADD_EVENT'
const ADD_GUEST = 'ADD_GUEST'
const GET_EVENT_LIST = 'GET_EVENT_LIST'
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'

/**
 * INITIAL STATE
 */
const defaultEventObject = {
  currentEvent: {},
  userEvents: []
}

/**
 * ACTION CREATORS
 */
const addEvent = event => ({type: ADD_EVENT, event})
const addGuest = guest => ({type: ADD_GUEST, guest})
const getEventList = eventList => ({type: GET_EVENT_LIST, eventList})
const getSingleEvent = eventObject => ({type: GET_SINGLE_EVENT, eventObject})

/**
 * THUNK CREATORS
 */
export const addEventThunk = event => async dispatch => {
  try {
    const res = await axios.post('/api/event/addEvent', event)
    let eventAdded = res.data
    console.log(res.data)
    dispatch(addEvent(eventAdded))
  } catch (err) {
    console.error(err)
  }
}
export const addGuestThunk = (eventId, guest) => async dispatch => {
  try {
    const res = await axios.post(`/api/event/addGuest/${eventId}`, {
      email: guest
    })
    let guestAdded = res.data

    dispatch(addGuest(guestAdded[0]))
  } catch (err) {
    console.error(err)
  }
}

export const getEventListThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/event/getEventList')
    let eventListReceived = res.data

    dispatch(getEventList(eventListReceived))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleEventThunk = eventId => async dispatch => {
  try {
    const res = await axios.get(`/api/event/getEvent/${eventId}`)
    let eventReceived = res.data

    dispatch(getSingleEvent(eventReceived))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultEventObject, action) {
  switch (action.type) {
    case ADD_EVENT: {
      console.log(action.event)
      return {
        currentEvent: action.event,
        userEvents: [...state.userEvents, action.event]
      }
    }
    case GET_EVENT_LIST: {
      return {...state, userEvents: action.eventList}
    }
    case GET_SINGLE_EVENT: {
      return {...state, currentEvent: action.eventObject}
    }
    case ADD_GUEST: {
      let newGuestArray = [...state.currentEvent.guests, action.guest]
      let currentEventUpdate = {...state.currentEvent, guests: newGuestArray}
      return {...state, currentEvent: currentEventUpdate}
    }
    default:
      return state
  }
}
