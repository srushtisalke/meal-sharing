import {useState, useEffect} from 'react';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

useEffect(() => {
  fetch('/api/meals') 
    .then(response => response.json())
    .then(data => setMeals(data))
    .catch(error => console.error('Error:', error));
}, []); 

return (
  <div>
    <h2>Meals List</h2>
    <ul>
      {meals.map(meals => (
        <li key={meals.id}>
          <h3>{meals.title}</h3>
          <p>{meals.description}</p>
          <p>Price: {meals.price}</p>
        </li>
      ))}
    </ul> 
  </div>
);
};
S

export default MealsList;