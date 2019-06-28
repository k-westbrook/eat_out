import React from 'react'
import {connect} from 'react-redux'
import {getEventListThunk} from '../store/event'
import {Link} from 'react-router-dom'

class EventList extends React.Component {
  componentDidMount() {
    this.props.getEventList()
  }
  render() {
    console.log(this.props.userEvents)
    return (
      <div>
        <h3>My Events</h3>
        {this.props.userEvents ? (
          this.props.userEvents.map(event => {
            return (
              <Link key={event.id} to={`/event${event.id}`}>
                {' '}
                {event.name}
              </Link>
            )
          })
        ) : (
          <div>
            <p>Add An Event!</p>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    userEvents: state.event.userEvents
  }
}

const mapDispatch = dispatch => {
  return {
    getEventList: () => dispatch(getEventListThunk())
  }
}

export default connect(mapState, mapDispatch)(EventList)
