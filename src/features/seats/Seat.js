import React from "react";
import "./Seat.css";
const RESERVED = "RESERVED";
const SOLD = "SOLD";

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
                        ? "seatSelected"
                        : "seatAvailable"
                }`}
                onClick={() => {
                    handleSeatClick();
                }}
            >
                {status === SOLD ? "X" : column}
            </div>
            {showStatus && (
                <div className="seatDescriptionBox seatText">
                    {status === RESERVED
                        ? "Selected"
                        : status.charAt(0) + status.slice(1).toLowerCase()}
                </div>
            )}
        </div>
    );
}
