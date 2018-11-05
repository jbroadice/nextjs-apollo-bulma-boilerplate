import cookie from 'cookie'

export default function getTokenFromCookie(headers) {
  const cookies = process.browser ? document.cookie : headers.cookie

  if (cookies) {
    const { token, refreshToken } = cookie.parse(cookies)
    return { token, refreshToken }
  }

  return null
}
