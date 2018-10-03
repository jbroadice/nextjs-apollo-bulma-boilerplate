import React from 'react'
import App, { Container } from 'next/app'

import { trim } from 'lodash-es'

import '../sass/styles.scss'

export default class MyApp extends App {
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
    const { Component, pageProps } = this.props

    return (
      <Container>
        <main className={ this.pageClassName }>
          <Component {...pageProps} />
        </main>
      </Container>
    )
  }
}
