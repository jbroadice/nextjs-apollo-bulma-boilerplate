import { withApollo } from 'react-apollo'
import signout from '../utils/signout'

import HeroHome from '../components/heroes/HeroHome'
import PageHead from '../components/meta/PageHead'
import Link from 'next/link'
import Container from 'react-bulma-components/lib/components/container'
import Section from 'react-bulma-components/lib/components/section'
import Button from 'react-bulma-components/lib/components/button'

const Index = props => (
  <div>
    <PageHead>
      <title>Hello world!</title>
    </PageHead>

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
