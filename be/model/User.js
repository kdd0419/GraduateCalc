const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: { type: String, default: '', unique: true, index: true },
    pw: { type: String, default: ''},
    name: {type: String, default: ''}
  
})

const User = mongoose.model('User', userSchema)

module.exports = User
