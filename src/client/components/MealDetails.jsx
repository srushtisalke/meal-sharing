import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReservationMealList from "./ReservationMealList";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function MealDetails() {
  const { id } = useParams(); 
  const [meal, setMeal] = useState(null);

useEffect(() => {
  fetch(`/api/meals/${id}`)
    .then((response) => response.json())
    .then((data) => setMeal(data))
    .catch((error) => console.error("Error:", error));

    fetch(`/api/reviews/${id}`)
    .then((response) => response.json())
    .then((data) => setMeal(data))
    .catch((error) => console.error("Error:", error));
}, [id]);

return (
  <div className="details">
    <h2>{meal.title}</h2>
    <p>{meal.description}</p>
    <p>Price: ${meal.price}</p>
  
    {meal.max_reservations > 0 && (
      <div className="reservation">
        <ReservationMealList id={id} />
        <hr />
        <ReviewForm id={id} />
      </div>
    )}
    <ReviewList reviews={reviews} />
  </div>
);
}

export default MealDetails;