const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mealSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  meal_when: {
    type: String,
    required: true
  },
  max_reservations: { 
    type: Number,
  required: true 
  },
  price: { 
    type: Number,
  required: true 
  }
}, {timestamps: true})

module.exports = mongoose.model('Meal', mealSchema)
