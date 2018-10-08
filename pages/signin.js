import React from 'react'

import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'

import Section from 'react-bulma-components/src/components/section'
import Hero from 'react-bulma-components/src/components/hero'
import Container from 'react-bulma-components/src/components/container'
import Columns from 'react-bulma-components/src/components/columns'
import SignInBox from '../components/boxes/SignInBox'

export default class SignIn extends React.Component {
  static async getInitialProps (context) {
    // TODO: inherit from app props instead of calling checkLoggedIn
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return {}
  }

  render() {
    return (
      <Section className='is-paddingless'>
        <Hero color='primary' size='fullheight' gradient>
          <Hero.Body>
            <Container>
              <Columns centered>
                <SignInBox />
              </Columns>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    )
  }
}
