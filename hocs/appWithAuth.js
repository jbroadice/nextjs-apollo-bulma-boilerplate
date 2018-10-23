import React from 'react'
import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'
import UserContext from '../contexts/UserContext'

export default App => {
  return class WithAuth extends React.Component {
    static displayName = `WithAuth(${App.displayName})`

    static async getInitialProps (context) {
      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context)
      }

      const { loggedInUser } = await checkLoggedIn(context.ctx.apolloClient)

      if (!loggedInUser.user && context.ctx.pathname !== '/signin') {
        // If not signed in, send them to signin page
        redirect(context, '/signin')
      }

      if (loggedInUser.user && context.ctx.pathname === '/signin') {
        // Already signed in? Throw them back to the main page
        redirect(context, '/')
      }

      return { ...appProps, loggedInUser }
    }

    render() {
      return (
        <UserContext.Provider value={ this.props.loggedInUser && this.props.loggedInUser.user }>
          <App {...this.props} />
        </UserContext.Provider>
      )
    }
  }
}
