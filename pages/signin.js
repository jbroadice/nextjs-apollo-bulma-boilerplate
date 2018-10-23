import React from 'react'

import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'

import PageHead from '../components/meta/PageHead'
import Section from 'react-bulma-components/lib/components/section'
import Hero from 'react-bulma-components/lib/components/hero'
import Container from 'react-bulma-components/lib/components/container'
import Columns from 'react-bulma-components/lib/components/columns'
import SignInBox from '../components/boxes/SignInBox'

export default class SignIn extends React.Component {
  static async getInitialProps (context) {
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
        <PageHead>
          <title>Sign In</title>
        </PageHead>
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
