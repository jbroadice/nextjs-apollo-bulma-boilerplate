import cookie from 'cookie'
import isNode from './isNode'

export default function getTokenFromCookie(headers) {
  const cookies = isNode() ? headers.cookie : document.cookie

  if (cookies) {
    return cookie.parse(cookies).token
  }

  return null
}
