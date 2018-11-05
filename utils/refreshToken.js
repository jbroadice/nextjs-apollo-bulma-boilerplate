import fetch from 'isomorphic-unfetch'
import storeTokens from './storeTokens'

const refreshToken = ({ token, refreshToken }, { headers, res }) =>
  fetch('http://jack-pc:4000/refresh', {
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
