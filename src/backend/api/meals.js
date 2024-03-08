import express from "express";
const router = express.Router();
import knex from "../database.js";

//Returns all meals using GET
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const allMeals = await knex("meals").select("*");
    response.json(allMeals);
  } catch (error) {
    response.status(500).json({ error: "Cannot find any Meal" });
  }
});


//Add a new meal using POST to the database
router.post("/", async (request, response) => {
  const date = new Date();
  try {
    const addNewMeal = await knex("meals").select("*").insert({
      title: request.body.title,
      description: request.body.description,
      location: request.body.location,
      meal_when: date,
      max_reservations: request.body.max_reservations,
      price: request.body.price,
      created_date: date,
    });
    await knex("meals").insert(addNewMeal);
    response.status(201).json("New meal added successfully")
  } catch (error) {
    response.status(500).json({ error: "Error adding new meal" });
  }
});

//Return the meal by id using GET
router.get("/:id", async(request, response) => {
  try {
      const mealById = await knex("meals").where("id", parseInt(request.params.id));
      response.json(mealById);
  } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Error retrieving meal" });
  }
});

//Update the meal by id using PUT
router.put("/:id", async(request, response) => {
  try {
      const updateMeal = await knex("meals")
          .where("id", parseInt(request.params.id))
          .update(request.body);
      response.json(updateMeal);
  } catch (error) {
      console.log(error);
      return response.status(500).json({ error: "Error updating meal"});
  }
});

//Delete the meal by id using DELETE
router.delete("/:id", async(request, response) => {
  try {
      const deletedMeal = await knex("meals")
          .where("id", parseInt(request.params.id))
          .del();
      response.json(`Deleted meal: ${deletedMeal}`);
  } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Error deleting meal"});
  }
});
export default router;
