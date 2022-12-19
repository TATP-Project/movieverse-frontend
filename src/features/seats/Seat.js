import React from "react";
import "./Seat.css";
const AVAILABLE = "AVAILABLE";
const RESERVED = "RESERVED";
const SOLD = "SOLD";

export default function Seat({ row, col, seatStatus }) {
  return (
    <div
      className={`seatBox seatNumber ${
        seatStatus === SOLD
          ? "seatSold"
          : seatStatus === RESERVED
          ? "seatSelected"
          : "seatAvailable"
      }`}
    >
      {seatStatus === SOLD ? "x" : col}
    </div>
  );
}
