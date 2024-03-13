const Reservation = require('../models/reservationModel')
const mongoose = require('mongoose')

// Get all meals
const getReservations = async (req, res) => {
  const reservations = await Reservation.find({}).sort({createdAt: -1})

  res.status(200).json(reservations)

}

// Get a single reservaiton
const getReservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Cannot find reservation'}) 
  }

  const reservation = await Reservation.findById(id)

  if (!reservation) {
    return res.status(404).json({error: 'Cannot find reservation'})
  }
  res.status(200).json(reservation)
}


// Create a new reservation
const createReservation = async (req, res) => {
  const{name, email, phonenumber, meal, max_reservations} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!email) {
    emptyFields.push('email')
  }
  if(!phonenumber) {
    emptyFields.push('phonenumber')
  }
  if(!meal) {
    emptyFields.push('meal')
  }
  if(!max_reservations) {
    emptyFields.push('max_reservations')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }
  // add reservation to db
  try {
    const reservation = await Reservation.create({name, email, phonenumber, meal, max_reservations})
    res.status(200).json(reservation)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// Delete a reservation
const deleteReservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Cannot find reservation'}) 
  }

  const reservation = await Reservation.findOneAndDelete({_id: id})

  if (!reservation) {
    return res.status(404).json({error: 'Cannot find reservation'})
  }
  res.status(200).json(reservation)
}

// Update a reservation
const updateReservation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Cannot find reservation'}) 
  }

  const reservation = await Reservation.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!reservation) {
    return res.status(400).json({error: 'Cannot find reservation'})
  }
  res.status(200).json(reservation)
}


module.exports = {
  getReservations,
  getReservation,
  createReservation,
  deleteReservation,
  updateReservation
}