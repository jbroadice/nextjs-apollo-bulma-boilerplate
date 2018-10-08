import { withApollo } from 'react-apollo'
import signout from '../utils/signout'

import Head from 'next/head'
import HeroHome from '../components/heroes/HeroHome'
import Link from 'next/link'
import Section from 'react-bulma-components/src/components/section'
import Container from 'react-bulma-components/src/components/container'
import Button from 'react-bulma-components/src/components/button'

const Index = props => (
  <div>
    <Head>
      <title>Hello world!</title>
    </Head>

    <Section>
      <HeroHome
        color='primary'
        renderTitle={ () => (
          <span>About</span>
        )}
        renderSubtitle={ () => (
          <Link prefetch href='/about'>
            <Button color='info' size='large'>Click</Button>
          </Link>
        )}/>
    </Section>
    <Section>
      <HeroHome
        color='info'
        renderTitle={ () => (
          <span>Grid example</span>
        )}
        renderSubtitle={ () => (
          <Link prefetch href='/tiles'>
            <Button color='primary' size='large'>Click</Button>
          </Link>
        )}/>
    </Section>
    <Section>
      <HeroHome
        color='warning'
        renderTitle={ () => (
          <span>Books</span>
        )}
        renderSubtitle={ () => (
          <Link prefetch href='/books'>
            <Button color='primary' size='large'>Click</Button>
          </Link>
        )}/>
    </Section>

    <Section>
      <Container>
        <Button onClick={ () => { signout(props.client)() } }>Sign out</Button>
      </Container>
    </Section>
  </div>
)

export default withApollo(Index)
