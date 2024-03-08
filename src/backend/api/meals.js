import express from "express";
const router = express.Router();
import knex from "../database.js";

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

//Adding query parameters
router.get("/", async (request, response) => {
  try {
    const q = request.query;
    const [keyQuery] = Object.keys(q);
    const [valueQuery] = Object.values(q);

    if(q) {
      switch (keyQuery) {

        case 'maxPrice': // Returns all meals that are cheaper than maxPrice
          const maxPrice = await knex("meals").select("title", "price").where("price", "<", +valueQuery);
          if (maxPrice.length){
            return response.json(maxPrice);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'availableReservations': // Returns all meals that still have available spots left, if true. If false, return meals that have no available spots left.
          const availableReservations = await knex.select("title", "max_reservations").from('meals').where("max_reservations", "!=", "max_reservations");
          const unavailableReservations = await knex.select("title", "max_reservations").from('meals').where("max_reservations", "==", "max_reservations");
          if(valueQuery === 'true'){
            if (availableReservations.length){
              return response.json(availableReservations);
            }
            response.status(404).json({ error: 'Not Found' });    
          } else if(valueQuery === 'false'){
            if (unavailableReservations.length){
              return response.json(unavailableReservations);
            }
            response.status(404).json({ error: 'Not Found' });
          } else {
            response.status(404).json({ error: 'Not Found' });
          }
          break;

        case 'title': // Returns all meals that partially match the given title. Rød grød will match the meals with the title Rød grød med fløde
          const title = await knex("meals").select("title").where("title", "like", `%${valueQuery}%`);
          if (title.length){
            return response.json(title);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'dateAfter': // Returns all meals where the date for when is after the given date.
          const dateAfter = await knex("meals").select("title", "created_date").where("created_date", ">", valueQuery);
          if (dateAfter.length){
            return response.json(dateAfter);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'dateBefore': // Returns all meals where the date for when is before the given date
          const dateBefore = await knex("meals").select("title", "created_date").where("created_date", "<", valueQuery);
          if (dateBefore.length){
            return response.json(dateBefore);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'limit': // Returns the given number of meals.
          const limit = await knex("meals").select("*").limit(+valueQuery);
          if (limit.length){
            return response.json(limit);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

          default:
          const allMeals = await knex("meals").select("*");
          response.json(allMeals);
      }    
    }
  }
  catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Error meals do not exits'
    });
  }
});

export default router;
