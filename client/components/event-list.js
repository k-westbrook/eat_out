import React from 'react'
import {connect} from 'react-redux'
import {getEventListThunk} from '../store/event'
import {Link} from 'react-router-dom'

class EventList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      componentLoaded: false
    }
  }
  componentDidMount() {
    this.props.getEventList()
    console.log(this.state)
    this.setState({componentLoaded: true})
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <h3>My Events</h3>
        {this.state.componentLoaded && this.props.userEvents.length ? (
          this.props.userEvents.map(event => {
            console.log(event.id)
            return (
              <div key={event.id}>
                <Link to={`/event${event.id}`}> {event.name}</Link>
              </div>
            )
          })
        ) : (
          <div>
            <Link to="/addEvent">Add an Event</Link>
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
