import { useState, useEffect } from "react";
import Meal from "./Meal";
// import CSS style

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error("Error:", error));
  }, 
[]);

return (
  <div className="containerList">
    <div className="containerTitle">
      <h2>Meals List</h2>
      <h4>Today's Special dishes</h4>
    </div>
    <div className="meals-grid">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal}/>
      ))}
    </div>
  </div>
);
};

export default MealsList;