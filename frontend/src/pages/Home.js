import { useEffect, useState } from "react";
import { useReservationsContext } from "../hooks/useReservationsContext";


// Components
import MealDetails from '../components/MealDetails'
import ReservationDetails from '../components/ReservationDetails'
import ReservationForm from '../components/ReservationForm'

const Home = () => {
  const [meals, setMeals] = useState(null)
  const { reservations, dispatch } = useReservationsContext()

  useEffect(() => {
  const fetchMeals = async () => {
    const response = await fetch('https://meal-sharing-6fxv.onrender.com/api/meals/')
    const json = await response.json()

    if (response.ok) {
      setMeals(json)
    }
  }
  const fetchReservations = async () => {
    const reservaitonResponse = await fetch('https://meal-sharing-6fxv.onrender.com/api/reservations/')
    const reservationJson = await reservaitonResponse.json()

    if (reservaitonResponse.ok) {
      dispatch({type: 'SET_RESERVATION', payload: reservationJson})
    }
  }

  fetchMeals()
  fetchReservations()
  }, [dispatch])

  return (
    <div className="home">
      <div className = "meals">
        {meals && meals.map((meal) => (
          <MealDetails key={meal._id} meal={meal} />
        ))}
      </div>
      <ReservationForm />
      <div className = "reservations">
        <h2> Current Reservations</h2>
        {reservations && reservations.map((reservation) => (
          <ReservationDetails key={reservation._id} reservation={reservation} />
        ))}
      </div>

    </div>
  )
}





export default Home;
