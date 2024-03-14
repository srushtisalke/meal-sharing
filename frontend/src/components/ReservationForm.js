import { useState } from "react"
import { useReservationsContext } from "../hooks/useReservationsContext";


const ReservationForm = () => {
  const { dispatch } = useReservationsContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [meal, setMeal] = useState('')
  const [max_reservations, setReservations] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  // const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const reservation = {name, email, phonenumber, meal, max_reservations}

    const response = await fetch('/api/reservations/', {
      method: 'POST',
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setEmail('')
      setPhonenumber('')
      setMeal('')
      setReservations('')
      setError(null)
      setEmptyFields([])
      console.log('New Reservation added', json)
      dispatch({type: 'CREATE_RESERVATION', payload: json})
  }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Meal Reservation</h3>

      <lable>Person Name:</lable>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error': ''}
      />

      <lable>Email:</lable>
      <input 
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes('email') ? 'error': ''}
      />

      <lable>Contact Number:</lable>
      <input 
        type="number"
        onChange={(e) => setPhonenumber(e.target.value)}
        value={phonenumber}
        className={emptyFields.includes('phonenumber') ? 'error': ''}
      />

      <lable>Meal of Choice:</lable>
      <input 
        type="text"
        onChange={(e) => setMeal(e.target.value)}
        value={meal}
        className={emptyFields.includes('meal') ? 'error': ''}
      />

      <lable>Number of People:</lable>
      <input 
        type="number"
        onChange={(e) => setReservations(e.target.value)}
        value={max_reservations}
        className={emptyFields.includes('max_reservations') ? 'error': ''}
      />
    <button>Make Reservation</button>
    {error && <div className="error">{error}</div>}
    </form>

  )

}

export default ReservationForm
