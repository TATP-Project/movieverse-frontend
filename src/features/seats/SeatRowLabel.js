import React from 'react'
import "./SeatRowLabel.css";

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

export default function SeatRowLabel({ index }) {
  return (
    <div className="seatRowLabel">{alphabet[index]}</div>
  )
}
