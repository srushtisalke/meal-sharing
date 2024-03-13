import { useReservationsContext } from "../hooks/useReservationsContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ReservationDetails = ({ reservation }) => {
  const { dispatch } = useReservationsContext()

  const handleClick = async () => {
    const response = await fetch('/api/reservations/' + reservation._id, {
      method: 'DELETE'
    })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'DELETE_RESERVATION', payload: json})

      }
  }

  return (
    <div className="reservation-details">
      <p><strong>Name : </strong>{reservation.name}</p>
      <p><strong>Email : </strong>{reservation.email}</p>
      <p><strong>Phone Number : </strong>{reservation.phonenumber}</p>
      <p><strong>Meal : </strong>{reservation.meal}</p>
      <p><strong>Max Reservation : </strong>{reservation.max_reservations}</p>
      <p>{formatDistanceToNow(new Date(reservation.createdAt), { addSuffix: true})}</p>
      <span className ="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>

  )
}

export default ReservationDetails
