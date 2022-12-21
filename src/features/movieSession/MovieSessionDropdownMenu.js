import React, { useState, useEffect } from "react";
import MovieSessionDropdownForSeat from "./MovieSessionDropdownForSeat";
import { Dropdown } from "antd";
import { getMovieSessionsByMovieId } from "../../api/movieSessions";
import * as dayjs from "dayjs";
import "./MovieSessionDropdown.css";

const BLANK = "------------";

export default function MovieSessionDropdownMenu({ movieSession }) {
  const [movieSessions, setMovieSessions] = useState([]);
  const [cinema, setCinema] = useState(movieSession.cinema.name);
  const [date, setDate] = useState(movieSession.timeslot.startDateTime);
  const [time, setTime] = useState(movieSession.timeslot.startDateTime);

  const movieSessionCinemas = Array.from(
    new Set(movieSessions.map((movieSession) => movieSession.cinema.name))
  );

  const movieSessionDates = Array.from(
    new Set(
      movieSessions
        .filter((movieSession) => movieSession.cinema.name === cinema)
        .map((movieSession) => movieSession.timeslot.startDateTime)
    )
  );

  const movieSessionTimes = Array.from(
    movieSessions
      .filter(
        (movieSession) =>
          movieSession.cinema.name === cinema &&
          convertToDate(movieSession.timeslot.startDateTime) ===
            convertToDate(date)
      )
      .map((movieSession) => movieSession.timeslot.startDateTime)
  );

  const handleCinemaClick = (cinemaName) => {
    setCinema(cinemaName);
    setDate(BLANK);
    setTime(BLANK);
  };

  const handleDateClick = (dateString) => {
    setDate(dateString);
    setTime(BLANK);
  }

  const convertToDate = (dateString) => {
    return dayjs(dateString).format("DD MMM YYYY (ddd)");
  };

  const convertToTime = (dateString) => {
    return dayjs(dateString).format("hh:mm A");
  };

  useEffect(() => {
    getMovieSessionsByMovieId(movieSession.movie.id).then((response) => {
      setMovieSessions(response.data);
    });
  }, [movieSession]);

  return (
    <div>
      <Dropdown
        overlayClassName="dropdownBox"
        dropdownRender={() => (
          <div>
            {movieSessionCinemas
              .filter((cinemaName) => cinemaName !== cinema)
              .map((cinemaName) => (
                <MovieSessionDropdownForSeat
                  key={cinemaName}
                  text={cinemaName}
                  onClick={() => {handleCinemaClick(cinemaName)}}
                />
              ))}
          </div>
        )}
      >
        <div className="dropdownBox ">
          <span className="dropdownBoxText">{cinema}</span>
        </div>
      </Dropdown>
      <Dropdown
        overlayClassName="dropdownBox"
        dropdownRender={() => (
          <div>
            {movieSessionDates
              .filter((dateString) => dateString !== date)
              .map((dateString) => (
                <MovieSessionDropdownForSeat
                  key={dateString}
                  text={convertToDate(dateString)}
                  onClick={() => {handleDateClick(dateString)}}
                />
              ))}
          </div>
        )}
      >
        <div className="dropdownBox ">
          <span className="dropdownBoxText">{convertToDate(date)}</span>
        </div>
      </Dropdown>
      <Dropdown
        overlayClassName="dropdownBox"
        dropdownRender={() => (
          <div>
            {movieSessionTimes
              .filter((dateString) => dateString !== time)
              .map((dateString) => (
                <MovieSessionDropdownForSeat
                  key={dateString}
                  text={convertToTime(dateString)}
                  onClick={() => {setTime(dateString)}}
                />
              ))}
          </div>
        )}
      >
        <div className="dropdownBox ">
          <span className="dropdownBoxText">{convertToTime(date)}</span>
        </div>
      </Dropdown>
    </div>
  );
}
