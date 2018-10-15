import React from 'react'
import Head from 'next/head'

export default ({ children }) => (
  <Head>
    { React.Children.map(children, child => {
      const { type, props } = child

      let newProps = {}
      switch (type) {
        case 'title':
          newProps = { children: `Test | ${props.children}` }
          break
      }

      return React.cloneElement(child, { ...props, ...newProps })
    }) }
  </Head>
)
