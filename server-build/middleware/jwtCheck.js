"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
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
});
exports.default = jwtCheck;
