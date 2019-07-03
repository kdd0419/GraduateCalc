var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Time = require('../../../model/time')

router.get('/', function(req, res, next) {
    Time.find()
      .then(r => {
        res.send({ success : true, times: r})
      })
      .catch(e => {
        res.send({ success : false})
      })
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id
    Time.find({id: id})
      .then(r => {
        res.send({ success : true, times: r})
      })
      .catch(e => {
        res.send({ success : false})
      })
});

router.post('/', (req, res, next) => {
  const { id, name, start, end } = req.body
  const u = new Time({ id, name, start, end })
    u.save()
      .then(r => {
        res.send({ success: true, msg: r })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
})

router.put('/:id', (req, res, next) => {
  const _id = req.params.id
  const { id, name, start, end } = req.body
  Time.updateOne({ _id: _id }, { $set: { id, name, start, end }})
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
  // res.send({ success: true, msg: 'put ok' })
})

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id
  Time.deleteOne({ _id: _id})
  .then(r => {
    res.send({ success: true, msg: r })
  })
  .catch(e => {
    res.send({ success: false, msg: e.message })
  })
})

module.exports = router;
