import { withApollo } from 'react-apollo'
import signout from '../utils/signout'

import Head from 'next/head'
import HeroHome from '../components/heroes/HeroHome'
import Link from 'next/link'
import Button from 'react-bulma-components/src/components/button'

const Index = props => (
  <div>
    <Head>
      <title>Hello world!</title>
    </Head>
    <HeroHome />
    <Link href='/signin'><Button>Sign in</Button></Link>
    <Button onClick={ () => { signout(props.client)() } }>Sign out</Button>
  </div>
)

export default withApollo(Index)
