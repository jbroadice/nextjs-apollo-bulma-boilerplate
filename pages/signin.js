import React from 'react'

import redirect from '../lib/redirect'

import PageHead from '../components/meta/PageHead'
import Section from 'react-bulma-components/lib/components/section'
import Hero from 'react-bulma-components/lib/components/hero'
import Container from 'react-bulma-components/lib/components/container'
import Columns from 'react-bulma-components/lib/components/columns'
import SignInBox from '../components/boxes/SignInBox'

class SignIn extends React.Component {
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

export default SignIn
