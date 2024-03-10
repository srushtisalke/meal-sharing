const express = require("express");
const router = express.Router();
const knex = require("../database");

//Add a new review using POST
router.post("/", async(request, response) => {
  try {
      const newReview = await knex("reviews").insert(request.body);
      response.send(`New added review: ${newReview}`);
  } catch (error) {
      console.log(error);
      response.send(error);
  }
});

//Return review by ID
router.get("/:id", async(request, response) => {
  try {
      const reviewById = await knex("reviews").where("id", parseInt(request.params.id));
      response.json(reviewById);
  } catch (error) {
      console.log(error);
      response.send(error);
  }
});

module.exports = router;