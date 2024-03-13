import { ReservationsContext } from "../context/ReservationContext";
import { useContext } from "react";

export const useReservationsContext = () => {
  const context = useContext(ReservationsContext)
  

  if (!context) {
    throw Error('useReservationsContext must be used inside an ReservationsContextProvider')
  }
  
  return context
}