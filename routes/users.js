const express = require('express');
const router = express.Router();
const jwtCheck = require('../middleware/jwtCheck')
/* GET users listing. */
router.get('/', jwtCheck, function(req, res, next) {
  res.send('secured resource');
});

module.exports = router;
