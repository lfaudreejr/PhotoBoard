const express = require('express');
const router = express.Router();
const userRouter = require('./users')

router.get('/user', userRouter)

module.exports = router;
