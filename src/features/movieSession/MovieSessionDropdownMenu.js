import React, { useState, useEffect } from "react";
import MovieSessionDropdownForSeat from "./MovieSessionDropdownForSeat";
import { Dropdown } from "antd";
import "./MovieSessionDropdown.css";
import { getMovieSessionsByMovieId } from "../../api/movieSessions";

export default function MovieSessionDropdownMenu({ movieSession }) {
  const [movieSessions, setMovieSessions] = useState([]);

  useEffect(() => {
    getMovieSessionsByMovieId(movieSession.movie.id).then((response) => {
      setMovieSessions(response.data);
      console.log(response);
    });
  }, [movieSession]);

  return (
    <div>
      <Dropdown
        overlayClassName="dropdownBox"
        dropdownRender={() => (
          <div>
            {movieSessions
              .filter(
                (session) => session.cinema.name !== movieSession.cinema.name
              )
              .map((session) => (
                <MovieSessionDropdownForSeat
                  key={session.id}
                  movieSession={session}
                />
              ))}
          </div>
        )}
      >
        <div className="dropdownBox ">
          <span className="dropdownBoxText">{movieSession.cinema.name}</span>
        </div>
      </Dropdown>
    </div>
  );
}
