import React from 'react'
import UserContext from '../contexts/UserContext'

const withUser = (Component) => (
  function ComponentWithUser(props) {
    return (
      <UserContext.Consumer>
        { user => <Component {...props} user={ user } /> }
      </UserContext.Consumer>
    )
  }
)

export default withUser
