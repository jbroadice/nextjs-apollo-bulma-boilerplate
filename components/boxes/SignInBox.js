import React from 'react'
import PropTypes from 'prop-types'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../../utils/redirect'

import Box from 'react-bulma-components/src/components/box'
import { Field, Control, Input } from 'react-bulma-components/src/components/form'
import Button from 'react-bulma-components/src/components/button'
import Message from 'react-bulma-components/src/components/message'

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password}) {
      token
    }
  }
`

class SignInBox extends React.Component {
  state = {
    email: '',
    password: ''
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

  onSubmit = ({ evt, signinUser }) => {
    evt.preventDefault()

    const { email, password } = this.state

    signinUser({
      variables: {
        email,
        password
      }
    })

    // this.setState({
    //   email: '',
    //   password: ''
    // })
  }

  onSubmitCompleted = (data) => {
    console.log('onCompleted', { data })
    // // Store the token in cookie
    // document.cookie = cookie.serialize('token', data.signinUser.token, {
    //   maxAge: 30 * 24 * 60 * 60 // 30 days
    // })
    // // Force a reload of all the current queries now that the user is
    // // logged in
    // client.cache.reset().then(() => {
    //   redirect({}, '/')
    // })
  }

  onSubmitError = (error) => {
    console.log('onSubmitError', { error })
  }

  render() {
    const { client, ...rest } = this.props
    const { email, password } = this.state

    return (
      <Box {...rest}>
        <Mutation mutation={ SIGN_IN } onCompleted={ this.onSubmitCompleted } onError={ this.onSubmitError }>
          {(signinUser, { data, error, loading }) => (
            <form onSubmit={ evt => this.onSubmit({ evt, signinUser }) }>
              { error && <Message color='danger'><Message.Body>Could not sign in.</Message.Body></Message> }
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
                    autoFocus
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
          )}
        </Mutation>
      </Box>
    )
  }
}

export default withApollo(SignInBox)
