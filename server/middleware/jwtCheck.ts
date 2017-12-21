import * as jwt from 'express-jwt'
import * as jwks from 'jwks-rsa'

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://lfaudreejr.auth0.com/.well-known/jwks.json"
  }),
  audience: 'https://photoboard.herokuapp.com/api',
  issuer: "https://lfaudreejr.auth0.com/",
  algorithms: ['RS256']
})

export default jwtCheck