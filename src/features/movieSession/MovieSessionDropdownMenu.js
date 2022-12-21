import React, { useState, useEffect } from "react";
import MovieSessionDropdownForSeat from "./MovieSessionDropdownForSeat";
import { Dropdown, Row, Col } from "antd";
import { getMovieSessionsByMovieId } from "../../api/movieSessions";
import { useDispatch } from "react-redux";
import { setMovieSession } from "../movieTimeslots/movieSessionSlice";
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
  const [isTimeObjectOpen, setIsTimeObjectOpen] = useState(false);
  const dispatch = useDispatch();

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

  const movieSessionTimeObjects = Array.from(
    movieSessions
      .filter(
        (movieSession) =>
          movieSession.cinema.name === cinema &&
          convertToDate(movieSession.timeslot.startDateTime) ===
            convertToDate(date)
      )
      .map((movieSession) => ({
        sessionId: movieSession.id,
        time: movieSession.timeslot.startDateTime,
      }))
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

  const handleTimeObjectClick = (sessionId, dateString) => {
    setTime(dateString);
    const nextMovieSession = movieSessions.find(
      (movieSession) => movieSession.id === sessionId
    );
    if (!!nextMovieSession) {
      dispatch(setMovieSession(nextMovieSession));
    }
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
          open={isTimeObjectOpen}
          dropdownRender={() => (
            <div
              onMouseLeave={() => {
                setIsTimeObjectOpen(false);
              }}
            >
              {movieSessionTimeObjects
                .map(({ sessionId, time: dateString }, index) => (
                  <MovieSessionDropdownForSeat
                    key={`${sessionId}-${index}`}
                    text={convertToTime(dateString)}
                    onClick={() => {
                        console.log(movieSessionTimeObjects)
                      handleTimeObjectClick(sessionId, dateString);
                    }}
                  />
                ))}
            </div>
          )}
        >
          <MovieSessionDropdownForSeat
            text={convertToTime(time)}
            onClick={() => {
              setIsTimeObjectOpen(true);
            }}
          />
        </Dropdown>
      </Col>
    </Row>
  );
}
