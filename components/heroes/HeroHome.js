import Container from 'react-bulma-components/lib/components/container'
import Heading from 'react-bulma-components/lib/components/heading'
import Hero from 'react-bulma-components/lib/components/hero'

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
