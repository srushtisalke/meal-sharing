import express from "express";
const router = express.Router();
import knex from "../database.js";

//Returns all review titles
router.get("/", async(request, response) => {
  try {
      const titles = await knex("reviews").select("title");
      response.json(titles);
  } catch (error) {
      throw error;
  }
});

// Display all reviews using GET
router.get("/", async(request, response) => {
  try {
      const allReviews = await knex("reviews").select("*");
      response.json(allReviews);
  } catch (error) {
      console.log(error);
      response.send(error);
  }
});

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

//Update review uing PUT
router.put("/:id", async(request, response) => {
  try {
      const updateReview = await knex("reviews")
        .where("id", parseInt(request.params.id))
        .update(request.body);
      response.json(updateReview);
  } catch (error) {
      console.log(error);
      response.send(error);
  }
});

//Deletes the review by id
router.delete("/:id", async(request, response) => {
  try {
      const deletedReview = await knex("reviews")
        .where("id", parseInt(request.params.id))
        .del();
      response.json(`Deleted review: ${deletedReview}`);
  } catch (error) {
      console.log(error);
      response.send(error);
  }
});

export default router;