import Container from 'react-bulma-components/src/components/container'
import Heading from 'react-bulma-components/src/components/heading'
import Hero from 'react-bulma-components/src/components/hero'

import Link from 'next/link'

const HeroHome = ({ renderTitle, renderSubtitle, color }) => (
  <Hero color={ color }>
    <Hero.Body>
      <Container>
        <Heading>
          { renderTitle() }
        </Heading>
        <Heading subtitle size={3}>
          { renderSubtitle() }
        </Heading>
      </Container>
    </Hero.Body>
  </Hero>
)

export default HeroHome
