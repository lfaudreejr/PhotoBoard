const express = require('express');
const router = express.Router();
const jwtCheck = require('../middleware/jwtCheck')

/* GET users listing. */
router.get('/', jwtCheck, function(req, res, next) {
  console.log('Sending secure data')
});

module.exports = router;
