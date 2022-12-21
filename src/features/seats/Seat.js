import React from "react";
import "./Seat.css";
const SELECTED = "SELECTED";
const SOLD = "SOLD";
const RESERVED ="RESERVED"

export default function Seat({
  id,
  column,
  status,
  onSeatClick,
  className,
  showStatus,
}) {
  const handleSeatClick = () => {
    if (status !== SOLD) {
      onSeatClick && onSeatClick(id);
    }
  };

  return (
    <div className={`${className}`}>
      <div
        className={`seatBox seatText ${
          status === SOLD
            ? "seatSold"
            : status === RESERVED
            ? "seatReserved"
            : status === SELECTED
            ? "seatSelected"
            : "seatAvailable"
        }`}
        onClick={() => {
          handleSeatClick();
        }}
      >
        {status === SOLD ? "X" : status === RESERVED ? "R" :column}
      </div>
      {showStatus && (
        <div className="seatDescriptionBox seatText">
          {status === SELECTED
            ? "Selected"
            : status.charAt(0) + status.slice(1).toLowerCase()}
        </div>
      )}
    </div>
  );
}
