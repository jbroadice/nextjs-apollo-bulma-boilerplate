import Head from 'next/head'
import HeroHome from '../components/heros/HeroHome'

const Index = props => (
  <div>
    <Head>
      <title>Hello world!</title>
    </Head>
    <HeroHome />
  </div>
)

export default Index
