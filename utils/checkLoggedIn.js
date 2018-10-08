import gql from 'graphql-tag'

export default apolloClient => (
  apolloClient.query({
    query: gql`
      query getUser {
        user {
          id
          firstName
          lastName
        }
      }
    `
  }).then(({ data }) => {
    return { loggedInUser: data }
  }).catch((error) => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)
