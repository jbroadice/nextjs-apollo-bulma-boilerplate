import gql from 'graphql-tag'

export default apolloClient => (
  apolloClient.query({
    query: gql`
      query getUser {
        me {
          id
          firstName
          lastName
        }
      }
    `,
    fetchPolicy: 'no-cache'
  }).then(({ data }) => {
    return { loggedInUser: data.me && { user: data.me } }
  }).catch((error) => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)
