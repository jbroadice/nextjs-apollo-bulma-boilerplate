import { withApollo } from 'react-apollo'
import withUser from '../hocs/withUser'
import signout from '../utils/signout'
import checkLoggedIn from '../utils/checkLoggedIn'

import HeroHome from '../components/heroes/HeroHome'
import PageHead from '../components/meta/PageHead'
import Link from 'next/link'
import Container from 'react-bulma-components/lib/components/container'
import Section from 'react-bulma-components/lib/components/section'
import Button from 'react-bulma-components/lib/components/button'

const Index = ({ user, client }) => (
  <div>
    <PageHead>
      <title>Hello world!</title>
    </PageHead>

    <Section>
      <HeroHome
        color='primary'
        renderTitle={ () => (
          <span>Hello, { user.firstName }!</span>
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
        <Button onClick={ async () => { console.log(await checkLoggedIn(client)) } }>Check user</Button>
        <Button onClick={ () => { signout(client)() } }>Sign out</Button>
      </Container>
    </Section>
  </div>
)

export default withUser(withApollo(Index))
