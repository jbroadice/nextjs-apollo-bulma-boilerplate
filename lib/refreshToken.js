import fetch from 'isomorphic-unfetch'
import getApiHost from './getApiHost'
import storeTokens from './storeTokens'

const refreshToken = ({ token, refreshToken }, { headers, res }) =>
  fetch(`${getApiHost()}/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  })
    .then(response => response.json())
    .then(refreshResponse => {
      storeTokens(refreshResponse, { headers, res })
      return refreshResponse
    })

export default refreshToken
