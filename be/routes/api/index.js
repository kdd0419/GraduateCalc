var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../model/User')



router.use('/user', require('./user'));



module.exports = router;
