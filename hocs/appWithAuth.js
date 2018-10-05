import React from 'react'
import cookie from 'cookie'

import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'

export default App => {
  return class WithAuth extends React.Component {
    static displayName = `WithAuth(${App.displayName})`

    static async getInitialProps (context) {
      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context)
      }

      const { loggedInUser } = await checkLoggedIn(context.ctx.apolloClient)

      if (!loggedInUser.user && context.router.pathname !== '/signin') {
        // If not signed in, send them somewhere more useful
        redirect(context, '/signin')
      }

      return { ...appProps, loggedInUser }
    }

    signout = apolloClient => () => {
      document.cookie = cookie.serialize('token', '', {
        maxAge: -1 // Expire the cookie immediately
      })

      // Force a reload of all the current queries now that the user is
      // logged in, so we don't accidentally leave any state around.
      apolloClient.cache.reset().then(() => {
        // Redirect to a more useful page when signed out
        redirect({}, '/signin')
      })
    }

    render() {
      return <App {...this.props} />
    }
  }
}
