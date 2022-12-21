import React, { useState, useEffect } from "react";
import MovieSessionDropdownForSeat from "./MovieSessionDropdownForSeat";
import { Dropdown, Row, Col } from "antd";
import { getMovieSessionsByMovieId } from "../../api/movieSessions";
import * as dayjs from "dayjs";
import "./MovieSessionDropdown.css";

const BLANK = "------------";
const INVALID_DATE = "Invalid Date";
const convertToDate = (dateString) => {
  const dateText = dayjs(dateString).format("DD MMM YYYY (ddd)");
  return dateText === INVALID_DATE ? BLANK : dateText;
};

const convertToTime = (dateString) => {
  const timeText = dayjs(dateString).format("hh:mm A");
  return timeText === INVALID_DATE ? BLANK : timeText;
};

export default function MovieSessionDropdownMenu({ movieSession }) {
  const [movieSessions, setMovieSessions] = useState([]);
  const [cinema, setCinema] = useState(movieSession.cinema.name);
  const [date, setDate] = useState(movieSession.timeslot.startDateTime);
  const [time, setTime] = useState(movieSession.timeslot.startDateTime);
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

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
  };

  useEffect(() => {
    getMovieSessionsByMovieId(movieSession.movie.id).then((response) => {
      setMovieSessions(response.data);
    });
  }, [movieSession]);

  return (
    <Row>
      <Col>
        <Dropdown
          open={isCinemaOpen}
          dropdownRender={() => (
            <div
              onMouseLeave={() => {
                setIsCinemaOpen(false);
              }}
            >
              {movieSessionCinemas
                .filter((cinemaName) => cinemaName !== cinema)
                .map((cinemaName, index) => (
                  <MovieSessionDropdownForSeat
                    key={`${cinemaName}-${index}`}
                    text={cinemaName}
                    onClick={() => {
                      handleCinemaClick(cinemaName);
                    }}
                  />
                ))}
            </div>
          )}
        >
          <MovieSessionDropdownForSeat
            text={cinema}
            onClick={() => {
              setIsCinemaOpen(true);
            }}
          />
          {/* <div className="dropdownBox ">
          <span className="dropdownBoxText">{cinema}</span>
        </div> */}
        </Dropdown>
      </Col>
      <Col>
        <Dropdown
          open={isDateOpen}
          dropdownRender={() => (
            <div
              onMouseLeave={() => {
                setIsDateOpen(false);
              }}
            >
              {movieSessionDates
                .filter((dateString) => dateString !== date)
                .map((dateString, index) => (
                  <MovieSessionDropdownForSeat
                    key={`${dateString}-${index}`}
                    text={convertToDate(dateString)}
                    onClick={() => {
                      handleDateClick(dateString);
                    }}
                  />
                ))}
            </div>
          )}
        >
          {/* <div className="dropdownBox ">
            <span className="dropdownBoxText">{convertToDate(date)}</span>
          </div> */}
          <MovieSessionDropdownForSeat
            text={convertToDate(date)}
            onClick={() => {
              setIsDateOpen(true);
            }}
          />
        </Dropdown>
      </Col>
      <Col>
        <Dropdown
          open={isTimeOpen}
          dropdownRender={() => (
            <div
              onMouseLeave={() => {
                setIsTimeOpen(false);
              }}
            >
              {movieSessionTimes
                .filter((dateString) => dateString !== time)
                .map((dateString, index) => (
                  <MovieSessionDropdownForSeat
                    key={`${dateString}-${index}`}
                    text={convertToTime(dateString)}
                    onClick={() => {
                      setTime(dateString);
                    }}
                  />
                ))}
            </div>
          )}
        >
          {/* <div className="dropdownBox">
            <span className="dropdownBoxText">{convertToTime(date)}</span>
          </div> */}
          <MovieSessionDropdownForSeat
            text={convertToTime(time)}
            onClick={() => {
              setIsTimeOpen(true);
            }}
          />
        </Dropdown>
      </Col>
    </Row>
  );
}
