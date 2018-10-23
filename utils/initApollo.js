import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import getTokenFromCookie from './getTokenFromCookie'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, { headers, networkStatusNotifierLink }) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'same-origin'
  })

  const authLink = setContext(() => {
    const token = getTokenFromCookie(headers)
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  let link = authLink.concat(httpLink)
  if (networkStatusNotifierLink) {
    link = networkStatusNotifierLink.concat(link)
  }

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache().restore(initialState || {}),
    link
  })
}

export default function initApollo (initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
