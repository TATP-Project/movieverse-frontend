import React from "react";
import "./MovieSessionDropdown.css";

export default function MovieSessionDropdownForSeat({ text, onClick }) {
  const handleClick = () => {
    onClick && onClick(text);
  };
  return (
    <div className="dropdownBox dropdownBoxItem" onClick={handleClick}>
      <span className="dropdownBoxText">{text}</span>
    </div>
  );
}
