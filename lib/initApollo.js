import { ApolloClient, InMemoryCache, Observable } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import fetch from 'isomorphic-unfetch'
import getTokenFromCookie from './getTokenFromCookie'
import refreshToken from './refreshToken'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, { headers, res, networkStatusNotifierLink }) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'same-origin'
  })

  const authLink = setContext(() => {
    const tokens = getTokenFromCookie(headers)
    return tokens ? {
      headers: {
        authorization: tokens.token ? `Bearer ${tokens.token}` : ''
      }
    } : null
  })

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            const tokensFromCookie = getTokenFromCookie(headers)

            if (tokensFromCookie) {
              // Let's refresh token through async request
              return new Observable(observer => {
                refreshToken(tokensFromCookie, { headers, res })
                  .then(refreshResponse => {
                    if (!refreshResponse.token) {
                      throw new Error('[JWT token refresh]: Could not refresh auth token')
                    }

                    operation.setContext({
                      headers: {
                        authorization: `Bearer ${refreshResponse.token}`,
                      }
                    })
                  })
                  .then(() => {
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer)
                    }

                    // Retry last failed request
                    forward(operation).subscribe(subscriber)
                  })
                  .catch(error => {
                    // No refresh or client token available, we force user to login
                    observer.error(error)
                  })
              })
            }
        }
      }
    }
  })

  let link = errorLink.concat(authLink.concat(httpLink))

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
