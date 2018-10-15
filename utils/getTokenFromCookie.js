import cookie from 'cookie'

export default function getTokenFromCookie(headers) {
  const cookies = process.browser ? document.cookie : headers.cookie

  if (cookies) {
    return cookie.parse(cookies).token
  }

  return null
}
