import Section from 'react-bulma-components/src/components/section'
import Container from 'react-bulma-components/src/components/container'
import Heading from 'react-bulma-components/src/components/heading'
import Hero from 'react-bulma-components/src/components/hero'

import Link from 'next/link'

const HeroHome = () => (
  <div>
    <Section>
      <Hero color="primary">
        <Hero.Body>
          <Container>
            <Heading>About</Heading>
            <Heading subtitle size={3}>
              <Link href="/about">
                <a>Click me</a>
              </Link>
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>

    <Section>
      <Hero color="danger">
        <Hero.Body>
          <Container>
            <Heading>Tiles</Heading>
            <Heading subtitle size={3}>
              <Link href="/tiles">
                <a>Click me</a>
              </Link>
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>
    <Section>
      <Hero color="info">
        <Hero.Body>
          <Container>
            <Heading>Hero title Info</Heading>
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
