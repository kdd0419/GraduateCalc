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

router.post('/in', function(req, res, next) {
  const {id, pw} = req.body
  if (!id) return res.send({ success: false, msg: '학번이 입력되지 않았습니다.'})
  if (!pwd) return res.send({ success: false, msg: '비밀번호가 입력되지 않았습니다.'})
  User.findOne({id: id})
  .then((r)=>{
    if (!r) throw new Error('일치하는 학번, 비밀번호가 없습니다.')
    if (r.pw !== pw) throw new Error('일치하는 학번, 비밀번호가 없습니다.')
  })
    .then((r) => {
      res.send({ success: true, msg: r })
    })
    .catch((e) => {
      res.send({success:false, msg: e.message})
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
