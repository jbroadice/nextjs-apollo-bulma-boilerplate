import 'isomorphic-unfetch'
import getApiHost from './getApiHost'

const signin = async ({ email, password }) => {
  let error = null
  let res = null

  try {
    res = await fetch(`${getApiHost()}/signin`, {
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

  return { res, error }
}

export default signin
