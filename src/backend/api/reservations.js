const express = require("express");
const router = express.Router();
const knex = require("../database");

// Add a new reservation using POST to the database
router.post("/", async (request, response) => {
  const date = new Date();
  try {
    const newReservation = await knex("reservations").select("*").insert({
      number_of_guests: request.body.number_of_guests,
      meal_id: request.body.meal_id,
      created_date: date,
      contact_phonenumber: request.body.contact_phonenumber,
      contact_name: request.body.contact_name,
      contact_email: request.body.contact_email,
    });
    await knex("reservations").insert(newReservation);
    response.status(201).json("New reservation created successfully")
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Error creating reservation" });
  }
});



//Return the reservation by id using GET
router.get("/:id", async (request, response) => {
  try {
    const reservationById = await knex("reservations").where("id", parseInt(request.params.id));
    if (reservationById) {
      response.json(reservationById);
    } else {
      response.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error retrieving reservation" });
  }
});

module.exports = router;