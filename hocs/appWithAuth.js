import React from 'react'
import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'

import Button from 'react-bulma-components/src/components/button'

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
        // If not signed in, send them somewhere more useful
        redirect(context, '/signin')
      }

      return { ...appProps, loggedInUser }
    }

    render() {
      return <App {...this.props} />
    }
  }
}
