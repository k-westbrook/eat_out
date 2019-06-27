import React from 'react'
import {connect} from 'react-redux'
import {addEventThunk} from '../store/event'

/**
 * COMPONENT
 */
class AddEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      location: '',
      locationName: '',
      date: '',
      time: '',
      passcode: null,
      adminId: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(evt) {
    evt.preventDefault()
    let eventName = evt.target.eventName.value
    let location = evt.target.location.value
    let locationName = evt.target.locationName.value
    let date = evt.target.date.value
    let time = evt.target.time.value

    this.setState({
      eventName,
      location,
      locationName,
      date,
      time
    })
    this.props.addEvent({
      eventName,
      location,
      locationName,
      date,
      time
    })
  }

  render() {
    return (
      <div>
        <h3>Add Your Event</h3>
        <div>
          <p>Add Event Here </p>
          <form onSubmit={this.onSubmit}>
            <label>
              Event Name:
              <input type="text" name="eventName" />
            </label>
            <label>
              Location Name:
              <input type="text" name="locationName" />
            </label>
            <label>
              Address/Location:
              <input type="text" name="location" />
            </label>
            <label>
              Date:
              <input type="text" name="date" />
            </label>
            <label>
              Time:
              <input type="text" name="time" />
            </label>
            <input type="submit" value="Create Event " />
          </form>
        </div>

        <div>
          <p>
            {this.state.eventName}
            {this.state.locationName}
            {this.state.location}
            {this.state.date}
            {this.state.time}
          </p>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    currentEvent: state.event
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addEvent: event => {
      dispatch(addEventThunk(event))
      ownProps.history.push('/myEvents')
    }
  }
}

export default connect(mapState, mapDispatch)(AddEvent)
