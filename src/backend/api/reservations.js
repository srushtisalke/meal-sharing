import express from "express";
const router = express.Router();
import knex from "../database";

//Returns all reservations using GET

router.get("/", async (request, response) => {
    try {
      const allReservations = await knex("reservations").select("*");
      response.json(allReservations);
    } catch (error) {
      response.status(500).json({ error: "Error retrieving reservations" });
    }
  });


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

//Return the meal by id using GET
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

//Update the meal by id using PUT
router.put("/:id", async (request, response) => {
  try {
    const updateReservation = await knex("reservations")
      .update(request.body)
      .where("id", parseInt(request.params.id))
    if (updateReservation) {
      return response.json({message: "Reservation updated successfully"});
    } else {
      return response.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.log(error)
    return response.status(500).json({ error: "Error updating reservation"});
  }
});

//Delete the meal by id using DELETE
router.delete("/:id", async (request, response) => {
  try {
    const deleteReservation = await knex("reservations").select("*").where("id", parseInt(request.params.id)).del();
    if (deleteReservation) {
      response.json({message: "Reservation deleted successfully"});
    } else {
      response.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Error deleting reservation"});
  }
});

export default router;