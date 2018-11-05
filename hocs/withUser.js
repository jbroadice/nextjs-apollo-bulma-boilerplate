import React from 'react'
import UserContext from '../contexts/UserContext'

// TODO: Perhaps use Apollo local state, with graphql() hoc, rather than React context

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
