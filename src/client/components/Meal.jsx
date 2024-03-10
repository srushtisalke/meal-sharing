import React from 'react';

const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>
    </div>
  );
};

export default Meal;