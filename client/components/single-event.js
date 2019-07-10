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
    this.props.addGuest(eventId, guestEmail)
  }
  render() {
    console.log(this.props.guests)
    return (
      <div>
        <h3>Event</h3>
        {this.props.currentEvent ? (
          <div>
            <h4>Name:{this.props.currentEvent.name}</h4>
            <h4>Location:{this.props.currentEvent.locationName}</h4>
            <h4>Address:{this.props.currentEvent.location}</h4>
            <h4>Time:{this.props.currentEvent.time}</h4>
            <h4>Date:{this.props.currentEvent.date}</h4>
            <div>
              <h4>Guests</h4>
              {this.props.guests.map(guest => {
                return (
                  <div key={guest.id}>
                    {guest.email}{' '}
                    {guest.GuestEvent.isComing ? (
                      <p>
                        is coming!<input type="submit" value="Can't attend" />
                      </p>
                    ) : (
                      <p>
                        can't come.<input type="submit" value="Can attend" />
                      </p>
                    )}
                  </div>
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
    currentEvent: state.event.currentEvent.event,
    guests: state.event.currentEvent.guests
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentEvent: eventId => dispatch(getSingleEventThunk(eventId)),
    addGuest: (eventId, guest) => dispatch(addGuestThunk(eventId, guest))
  }
}

export default connect(mapState, mapDispatch)(SingleEvent)
