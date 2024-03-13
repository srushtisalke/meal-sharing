const express = require('express')
const {
  createReservation,
  getReservations,
  getReservation,
  deleteReservation,
  updateReservation
} = require('../controllers/reservationController')


const router = express.Router()

// To get all resevations
router.get('/', getReservations)

// To get single reservation
router.get('/:id', getReservation)

// To post a new reservation
router.post('/', createReservation)


// To delete a  reservation
router.delete('/:id', deleteReservation)


// To update a reservation
router.patch('/:id', updateReservation)


module.exports = router