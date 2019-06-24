var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../model/User')

router.get('/', function(req, res, next) {
    User.find()
      .then(r => {
        res.send({ success : true, users: r})
      })
      .catch(e => {
        res.send({ success : false})
      })
});

router.post('/', (req, res, next) => {
  const { id, name, pw } = req.body
  const u = new User({ id, name, pw })
    u.save()
      .then(r => {
        res.send({ success: true, msg: r })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
})

module.exports = router;
