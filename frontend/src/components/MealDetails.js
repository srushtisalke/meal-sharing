import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const MealDetails = ({ meal }) => {
  return (
    <div className="meal-details">
      <h4>{meal.title}</h4>
      <p><strong>Description : </strong>{meal.description}</p>
      <p><strong>Location : </strong>{meal.location}</p>
      <p><strong>Meal_When : </strong>{meal.meal_when}</p>
      <p><strong>Reservation : </strong>{meal.max_reservations}</p>
      <p><strong>Price : </strong>{meal.price}</p>
      <p>{formatDistanceToNow(new Date(meal.createdAt), { addSuffix: true})}</p>
    </div>

  )
}

export default MealDetails