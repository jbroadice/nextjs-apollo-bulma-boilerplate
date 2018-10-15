import React from 'react'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'
import cookie from 'cookie'
import redirect from '../../utils/redirect'
import 'isomorphic-unfetch'

import Box from 'react-bulma-components/lib/components/box'
import { Field, Control, Input } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import Message from 'react-bulma-components/lib/components/message'

class SignInBox extends React.Component {
  state = {
    email: '',
    password: '',
    error: false,
    loading: false
  }

  static propTypes = {
    client: PropTypes.object.isRequired
  }

  onEmailChange = evt => {
    this.setState({ email: evt.currentTarget.value })
  }

  onPasswordChange = evt => {
    this.setState({ password: evt.currentTarget.value })
  }

  onSubmit = async (evt) => {
    evt.preventDefault()

    this.setState({ loading: true })

    const { email, password } = this.state

    let error = null
    let res = null
    try {
      res = await fetch('http://jack-pc:4000/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
          error = 'Invalid sign in credentials provided.'
        }
        else {
          res.statusText || 'Unknown error.'
        }
      }

      res = await res.json()
    } catch (e) {
      error = `Network error: ${e.message}`
      res = null
    }

    this.setState({ error, loading: false })

    if (res && res.token) {
      this.signinComplete(res.token)
    }
  }

  signinComplete = (token) => {
    // Store the token in cookie
    document.cookie = cookie.serialize('token', token, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })
    // Force a reload of all the current queries now that the user is logged in
    this.props.client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }

  renderErrorMessage = (message) => (
    <Message color='danger'>
      <Message.Header>Could not sign in.</Message.Header>
      <Message.Body>{ message || 'Unknown error' }</Message.Body>
    </Message>
  )

  render() {
    const { client, ...rest } = this.props
    const { email, password, error, loading } = this.state

    return (
      <Box {...rest}>
        <form onSubmit={ this.onSubmit }>
          { error && this.renderErrorMessage(error) }
          <Field>
            <Control>
              <Input
                size='large'
                placeholder='Email'
                autoFocus
                onChange={ this.onEmailChange }
                value={ email } />
            </Control>
          </Field>
          <Field>
            <Control>
              <Input
                type='password'
                size='large'
                placeholder='Password'
                onChange={ this.onPasswordChange }
                value={ password } />
            </Control>
          </Field>
          <Field>
            <Button
              size='large'
              color='info'
              fullwidth
              submit
              loading={ loading }>Login</Button>
          </Field>
        </form>
      </Box>
    )
  }
}

export default withApollo(SignInBox)
