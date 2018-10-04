import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head'

import Section from 'react-bulma-components/src/components/section'
import Container from 'react-bulma-components/src/components/container'
import Heading from 'react-bulma-components/src/components/heading'
import Loader from 'react-bulma-components/src/components/loader'
import Message from 'react-bulma-components/src/components/message'
import ButtonHome from '../components/buttons/ButtonHome'

const GET_BOOKS = gql`
  {
    books {
      title
      author
    }
  }
`

const renderLoadingSpinner = () => (
  <Loader
    style={{
      width: 300,
      height: 300
    }} />
)

const renderBooksList = ({ books }) => (
  <ul>
    { books.map((book, i) => (
      <li key={ i }>
        <strong>{ book.title }</strong>
        <br />
        { book.author }
      </li>
    ))}
  </ul>
)

const renderErrorMessage = ({ message }) => (
  <Message color='danger'>
    <Message.Header>There was an error loading the books.</Message.Header>
    <Message.Body>{ message || 'Unknown error' }</Message.Body>
  </Message>
)

const Books = ({ client }) => (
  <Section>
    <Head>
      <title>Books</title>
    </Head>
    <Container className='content'>
      <Heading size={ 2 }>
        Books:
      </Heading>

      <Query query={ GET_BOOKS }>
        {({ loading, error, data }) => {
          console.log('Apollo Query', { loading, error, data })

          if (error) return renderErrorMessage(error)
          if (loading) return renderLoadingSpinner()

          return renderBooksList(data)
        }}
      </Query>

      <ButtonHome size='large' />
    </Container>
  </Section>
)

export default withApollo(Books)
