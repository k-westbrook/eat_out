import React from 'react'
import {connect} from 'react-redux'
import {getEventListThunk} from '../store/event'

class EventList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    this.props.getEventList()
  }
  render() {
    return (
      <div>
        <h3>My Events</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userEvents: state.userEvents
  }
}

const mapDispatch = dispatch => {
  return {
    getEventList: () => dispatch(getEventListThunk())
  }
}

export default connect(mapState, mapDispatch)(EventList)
