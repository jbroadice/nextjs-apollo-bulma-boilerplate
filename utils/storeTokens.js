import cookie from 'cookie'

const storeTokens = ({ token, refreshToken }, serverContext) => {
  const cookieOpts = {
    sameSite: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }

  const cookies = { token, refreshToken }

  const cookiesSerialized = (withOpts = true) => {
    const getValue = key => cookies[key] || ''

    return Object.keys(cookies).map(key =>
      withOpts
        ? cookie.serialize(key, getValue(key), cookieOpts)
        : `${key}=${getValue(key)}`
    )
  }

  console.log('storeTokens', { cookies })

  if (process.browser) {
    cookiesSerialized().forEach(entry => {
      document.cookie = entry
    })
  } else {
    serverContext.headers.cookie = cookiesSerialized(false).join('; ')
    serverContext.res.setHeader('Set-Cookie', cookiesSerialized())
  }
}

export default storeTokens
