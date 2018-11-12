import React from 'react'
import { trim, flowRight } from 'lodash-es'

import appWithApollo from '../hocs/appWithApollo'
import appWithAuth from '../hocs/appWithAuth'
import appWithServiceWorker from '../hocs/appWithServiceWorker'

import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import NProgress from 'next-nprogress/component'

import '../sass/styles.scss'

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  get pageClassName() {
    let page = this.props.router.asPath

    if (page === '/') {
      page = 'home'
    }

    return `page-${trim(page, '/')}`
  }

  renderMain = ({ loading } = {}) => {
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
        { loading && (
          <style jsx global>{`
            body, body * {
              cursor: progress !important;
            }
          `}
          </style>
        )}
        <main className={ this.pageClassName }>
          <Component {...pageProps} />
        </main>
      </React.Fragment>
    )
  }

  render () {
    const { apolloClient, NetworkStatusNotifier } = this.props

    return (
      <Container>
        <NProgress />
        <ApolloProvider client={ apolloClient }>
          { NetworkStatusNotifier
            ? <NetworkStatusNotifier render={this.renderMain} />
            : this.renderMain() }
        </ApolloProvider>
      </Container>
    )
  }
}

export default flowRight(
  appWithApollo,
  appWithAuth,
  appWithServiceWorker
)(MyApp)
