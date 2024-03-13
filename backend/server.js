require('dotenv').config()  // Set up env variables

const express = require('express')
const mongoose = require('mongoose')
const mealRoutes = require('./routes/meals')
const reservationRoutes = require('./routes/reservations')

const app = express()  // Express App

// Middleware
app.use(express.json()) // to get the request body

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
// app.get('/', (req, res) => {
//   res.json({"MSSG" : "Welcome to the APP"})
// })
app.use('/api/meals', mealRoutes)
app.use('/api/reservations', reservationRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for request
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
