import React from 'react'
import Seat from "../features/seats/Seat";

export default function SelectingSeatPage() {
  return (
    <div><Seat row={4} col={10} seatStatus="AVAILABLE"/></div>
  )
}
