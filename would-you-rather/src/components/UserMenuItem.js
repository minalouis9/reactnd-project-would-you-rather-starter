import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MenuItem } from '@material-ui/core'

class UserMenuItem extends Component {
  render() {
    const { user, onSelected } = this.props

    const {
      name, id
    } = user

    return (
      <MenuItem key={id} onClick={()=>{
          onSelected(name)
          }}>
          {name}
      </MenuItem>
    )
  }
}

function mapStateToProps ({ users}, { id }) {
  const user = users[id]
  
  return {
      user: {
        id: user.id,
        name: user.name,
        // avatarURL: ,
        answers: user.answers,
        questions: user.questions
      }
  }
}

export default connect(mapStateToProps)(UserMenuItem)