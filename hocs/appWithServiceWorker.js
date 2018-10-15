import React from 'react'
import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'

export default App => {
  return class WithServiceWorker extends React.Component {
    static displayName = `WithServiceWorker(${App.displayName})`

    componentDidMount() {
      if (location.protocol === 'https:' && 'serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log('service worker registration successful')
          })
          .catch(err => {
            console.warn('service worker registration failed', err.message)
          })
      }
    }

    render() {
      return <App {...this.props} />
    }
  }
}
