const Meal = require('../models/mealModel')
const mongoose = require('mongoose')

// Get all meals
const getMeals = async (req, res) => {
  const meals = await Meal.find({}).sort({createdAt: -1})

  res.status(200).json(meals)

}

// Get a single meal
const getMeal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Cannot find meal'}) 
  }

  const meal = await Meal.findById(id)

  if (!meal) {
    return res.status(404).json({error: 'Cannot find meal'})
  }
  res.status(200).json(meal)
}


// Create a new meal
const createMeal = async (req, res) => {
  const{title, description, location, meal_when, max_reservations, price} = req.body
  // add meal to db
  try {
    const meal = await Meal.create({title, description, location, meal_when, max_reservations, price})
    res.status(200).json(meal)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// Delete a meal
const deleteMeal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Cannot find meal'}) 
  }

  const meal = await Meal.findOneAndDelete({_id: id})

  if (!meal) {
    return res.status(404).json({error: 'Cannot find meal'})
  }
  res.status(200).json(meal)
}

// Update a meal
const updateMeal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Cannot find meal'}) 
  }

  const meal = await Meal.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!meal) {
    return res.status(400).json({error: 'Cannot find meal'})
  }
  res.status(200).json(meal)
}


module.exports = {
  getMeals,
  getMeal,
  createMeal,
  deleteMeal,
  updateMeal
}