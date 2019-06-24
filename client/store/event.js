import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_EVENT = 'ADD_EVENT'

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

/**
 * THUNK CREATORS
 */
export const addEventThunk = event => async dispatch => {
  try {
    // const res = await axios.post('/event/', event)
    // let eventAdded = res.data;
    dispatch(addEvent(event))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultEventObject, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {...state, currentEvent: action.event}
    default:
      return state
  }
}
