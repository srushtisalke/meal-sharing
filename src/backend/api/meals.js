const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all meals using GET
router.get("/", async (request, response) => {
  try {
    const allMeals = await knex("meals").select("*");
    response.json(allMeals);
  } catch (error) {
    response.status(500).json({ error: "Cannot find any Meal" });
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

module.exports = router;
