import React from 'react'
import {connect} from 'react-redux'
import {getSingleEventThunk, addGuestThunk} from '../store/event'

class SingleEvent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    let currenEventId = this.props.match.params.eventId
    this.props.getCurrentEvent(currenEventId)
    this.setState({eventId: currenEventId})
  }

  onSubmit(evt) {
    evt.preventDefault()
    let eventId = this.state.eventId
    let guestEmail = evt.target.guestEmail.value
    console.log(eventId, guestEmail)
    this.props.addGuest(eventId, guestEmail)
  }
  render() {
    return (
      <div>
        <h3>Event</h3>
        {this.props.currentEvent.event ? (
          <div>
            <h4>Name:{this.props.currentEvent.event.name}</h4>
            <h4>Location:{this.props.currentEvent.event.locationName}</h4>
            <h4>Address:{this.props.currentEvent.event.location}</h4>
            <h4>Time:{this.props.currentEvent.event.time}</h4>
            <h4>Date:{this.props.currentEvent.event.date}</h4>
            <div>
              <h4>Guests</h4>
              {this.props.currentEvent.guests.map(guest => {
                return (
                  <p key={guest.id}>
                    {guest.email}{' '}
                    {guest.GuestEvent.isComing ? (
                      <div>
                        is coming!<input type="submit" value="Can't attend" />
                      </div>
                    ) : (
                      <div>
                        can't come.<input type="submit" value="Can attend" />
                      </div>
                    )}
                  </p>
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            <h3>Event details loading</h3>
          </div>
        )}

        <div>
          <form onSubmit={this.onSubmit}>
            <label>
              Guest email:
              <input type="text" name="guestEmail" />
              <input type="submit" value="Add Guest" />
            </label>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentEvent: state.event.currentEvent
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentEvent: eventId => dispatch(getSingleEventThunk(eventId)),
    addGuest: (eventId, guest) => dispatch(addGuestThunk(eventId, guest))
  }
}

export default connect(mapState, mapDispatch)(SingleEvent)
