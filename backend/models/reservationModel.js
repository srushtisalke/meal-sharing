const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reservationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  meal: {
    type: String,
    required: true
  },
  max_reservations: { 
    type: Number,
  required: true 
  }
}, {timestamps: true})

module.exports = mongoose.model('Reservation', reservationSchema)
