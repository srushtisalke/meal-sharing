// ('/',() => {})
const express = require('express')
const {
  createMeal,
  getMeals,
  getMeal,
  deleteMeal,
  updateMeal
} = require('../controllers/mealController')


const router = express.Router()

// To get all meals
router.get('/', getMeals)

// To get single meal
router.get('/:id', getMeal)

// To post a new meal
router.post('/', createMeal)


// To delete a  meal
router.delete('/:id', deleteMeal)


// To update a meal
router.patch('/:id', updateMeal)


module.exports = router