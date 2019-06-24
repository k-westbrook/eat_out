import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class AddEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      locationName: '',
      date: '',
      time: '',
      passcode: null,
      adminId: null
    }
  }

  render() {
    return (
      <div>
        <h3>Add Your Event</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AddEvent)
