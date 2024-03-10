import React, { useEffect, useState } from 'react';
import ReservationMealItem from './ReservationMealItem';

const ReservationMealList = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    contact_name: '',
    contact_email: '',
    number_of_guests: '',
    contact_phonenumber: '',
  });
  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const response = await fetch('http://localhost:5001/api/Reservation');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.log('Error fetching reservations:', error);
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send the new reservation data to the server
    fetch('http://localhost:5001/api/Reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the reservations list with the new reservation
        setReservations([...reservations, data]);
        // Reset the new reservation form
        setNewReservation({
          contact_name: '',
          contact_email: '',
          number_of_guests: '',
          contact_phonenumber: '',
          meal_id: '',
        });
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="reservation-container">
      <ul className="reservation-cards">
        {reservations.map((reservation) => (
          <ReservationMealItem
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReservationMealList;