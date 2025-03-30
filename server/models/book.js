const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  genre: {
    type: String,
    required: false
  },
  isAvailable: {
    type: Boolean,
    required: true
  },
  summary: {
    type: String,
    required: false
  },
  photoUrl: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Book', bookSchema)
