import React from "react";
import { setMovieSession } from "../movieTimeslots/movieSessionSlice";
import { useDispatch } from "react-redux";
import "./MovieSessionDropdown.css";

export default function MovieSessionDropdownForSeat({ movieSession }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMovieSession(movieSession));
  };
console.log(movieSession.cinema)
  return (
    <div className="dropdownBox dropdownBoxItem" onClick={handleClick}>
      <span className="dropdownBoxText">{movieSession.cinema.name}</span>
    </div>
  );
}
