import React from 'react'
import {connect} from 'react-redux'
import {getSingleEventThunk} from '../store/event'

class SingleEvent extends React.Component {
  componentDidMount() {
    let currenEventId = this.props.match.params.eventId
    this.props.getCurrentEvent(currenEventId)
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
                return <p>{guest.email}</p>
              })}
            </div>
          </div>
        ) : (
          <div>
            <h3>Event details loading</h3>
          </div>
        )}
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
    getCurrentEvent: eventId => dispatch(getSingleEventThunk(eventId))
  }
}

export default connect(mapState, mapDispatch)(SingleEvent)
