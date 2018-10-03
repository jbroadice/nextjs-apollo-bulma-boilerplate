import React, { Component } from 'react'

import Head from 'next/head'
import Section from 'react-bulma-components/src/components/section'
import Container from 'react-bulma-components/src/components/container'
import Heading from 'react-bulma-components/src/components/heading'
import Message from 'react-bulma-components/src/components/message'
import Button from 'react-bulma-components/src/components/button'
import ButtonHome from '../components/buttons/ButtonHome'

class About extends Component {
  state = {
    showNotice: true
  }

  onBtnDismissClick = (evt) => {
    this.setState({ showNotice: false })
  }

  renderInfoMessage = () => (
    <Message color="info">
      <Message.Header>
        Title
        <Button remove onClick={ this.onBtnDismissClick } />
      </Message.Header>
      <Message.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis
        placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et
        dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
        arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna,
        vehicula et sem eget, facilisis sodales sem.
      </Message.Body>
    </Message>
  )

  render() {
    return (
      <Section>
        <Head>
          <title>About</title>
        </Head>
        <Container>
          <Heading size={1}>About</Heading>

          { this.state.showNotice && this.renderInfoMessage() }

          <ButtonHome size='large' />
        </Container>
      </Section>
    )
  }
}

export default About
