import React from "react";
import "./Seat.css";
const AVAILABLE = "AVAILABLE";
const RESERVED = "RESERVED";
const SOLD = "SOLD";

export default function Seat({ id, column, status, onSeatClick, className }) {
  const handleSeatClick = () => {
    if (status !== SOLD) {
      onSeatClick(id);
    }
  };

  return (
    <div
      className={`seatBox seatNumber ${
        status === SOLD
          ? "seatSold"
          : status === RESERVED
          ? "seatSelected"
          : "seatAvailable"
      } ${className}`}
      onClick={() => {handleSeatClick()}}
    >
      {status === SOLD ? "x" : column}
    </div>
  );
}
