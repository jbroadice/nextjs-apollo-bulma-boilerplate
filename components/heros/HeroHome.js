import Section from 'react-bulma-components/src/components/section'
import Container from 'react-bulma-components/src/components/container'
import Heading from 'react-bulma-components/src/components/heading'
import Hero from 'react-bulma-components/src/components/hero'

import Link from 'next/link'

const HeroHome = () => (
  <div>
    <Section>
      <Hero color='primary'>
        <Hero.Body>
          <Container>
            <Heading>
              <Link prefetch href='/about'>
                <a>About</a>
              </Link>
            </Heading>
            <Heading subtitle size={3}>
              Subtitle
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>

    <Section>
      <Hero color='danger'>
        <Hero.Body>
          <Container>
            <Heading>
              <Link prefetch href='/tiles'>
                <a>Tiles</a>
              </Link>
            </Heading>
            <Heading subtitle size={3}>
              Subtitle
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>
    <Section>
      <Hero color='info'>
        <Hero.Body>
          <Container>
            <Heading>
              <Link prefetch href='/books'>
                <a>Books</a>
              </Link>
            </Heading>
            <Heading subtitle size={3}>
              Subtitle
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>
  </div>
)

export default HeroHome
