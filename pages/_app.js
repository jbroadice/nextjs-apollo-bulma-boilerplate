import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import appWithApollo from '../hocs/appWithApollo'
import appWithAuth from '../hocs/appWithAuth'
import { trim, flowRight } from 'lodash-es'

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

  render () {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <ApolloProvider client={ apolloClient }>
          <main className={ this.pageClassName }>
            <Component {...pageProps} />
          </main>
        </ApolloProvider>
      </Container>
    )
  }
}

export default flowRight(appWithApollo, appWithAuth)(MyApp)
