import React, { useState, useEffect } from 'react'
import { getSeatsByMovieSessionId } from '../api/movieSessions';
import Seat from "../features/seats/Seat";
import SeatTable from "../features/seats/SeatTable";

export default function SelectingSeatPage() {

    const [seats, setSeats] = useState([]);
    
    useEffect(() => {
        getSeatsByMovieSessionId("63a01924a773310c1b950d12")
        .then((response) => {
            setSeats(response.data);
        })
    }, [])

  return (
    <div>
        <SeatTable seats={seats} />
    </div>
  )
}
