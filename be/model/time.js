const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: { type: String, default: '', unique: true, index: true },
    name: { type: String, default: ''},
    start: { type: String, default: ''},
    end: {type: String, default: ''}
  
})

const Time = mongoose.model('Time', userSchema)

module.exports = Time
