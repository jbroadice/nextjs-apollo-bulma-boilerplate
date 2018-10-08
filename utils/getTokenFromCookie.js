import cookie from 'cookie'
import isNode from './isNode'

export default function getTokenFromCookie(headers) {
  const cookies = cookie.parse(isNode() ? headers.cookie : document.cookie)
  return cookies.token
}
