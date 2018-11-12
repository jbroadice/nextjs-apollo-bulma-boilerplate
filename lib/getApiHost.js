const getApiHost = () => (
  process.env.NODE_ENV === 'production'
    ? 'https://LIVE_API_HOST'
    : 'http://localhost:4000'
)

export default getApiHost
