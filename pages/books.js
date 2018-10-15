import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import PageHead from '../components/meta/PageHead'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Heading from 'react-bulma-components/lib/components/heading'
import Loader from 'react-bulma-components/lib/components/loader'
import Message from 'react-bulma-components/lib/components/message'
import { Input } from 'react-bulma-components/lib/components/form'
import ButtonHome from '../components/buttons/ButtonHome'

const GET_BOOKS = gql`
  query Book($titleLike: String) {
    books(titleLike: $titleLike) {
      title
      author
    }
  }
`

class Books extends React.Component {
  state = {
    titleLike: ''
  }

  renderBooksList = ({ books }) => (
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

  renderErrorMessage = ({ message }) => (
    <Message color='danger'>
      <Message.Header>There was an error loading the books.</Message.Header>
      <Message.Body>{ message || 'Unknown error' }</Message.Body>
    </Message>
  )

  renderLoadingSpinner = () => (
    <Loader
      style={{
        width: 300,
        height: 300
      }} />
  )

  onFilterChange = (evt) => {
    this.setState({ titleLike: evt.currentTarget.value })
  }

  getQueryVariables = () => ({
    titleLike: `%${this.state.titleLike}%`
  })

  render() {
    const { titleLike } = this.state

    return (
      <Section>
        <PageHead>
          <title>Books</title>
        </PageHead>
        <Container className='content'>
          <Heading size={ 2 }>
            Books:
          </Heading>

          <Input
            placeholder='Filter'
            size='large'
            onChange={ this.onFilterChange }
            value={ titleLike } />

          <Query query={ GET_BOOKS } variables={ this.getQueryVariables() }>
            {({ loading, error, data }) => {
              console.log('Apollo Query', { loading, error, data })

              if (error) return this.renderErrorMessage(error)
              if (loading) return this.renderLoadingSpinner()

              return this.renderBooksList(data)
            }}
          </Query>

          <ButtonHome size='large' />
        </Container>
      </Section>
    );
  }
}

export default withApollo(Books)
