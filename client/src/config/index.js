function getBaseUrl () {
  return `${window.location.origin}`
}

export default {
  DOMAIN: 'lfaudreejr.auth0.com',
  CLIENT_ID: 'exgiRaE0pykjn3P70dPvVJW58DLJq7Ny',
  REDIRECT_URI: `${getBaseUrl()}/callback`
}
