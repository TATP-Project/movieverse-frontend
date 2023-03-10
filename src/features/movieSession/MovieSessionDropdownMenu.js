import React, { useState, useEffect } from "react";
import MovieSessionDropdownForSeat from "./MovieSessionDropdownForSeat";
import { Dropdown, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getMovieSessionsByMovieId } from "../../api/movieSessions";
import { useDispatch } from "react-redux";
import { setMovieSession } from "../movieTimeslots/movieSessionSlice";
import * as dayjs from "dayjs";
import "./MovieSessionDropdown.css";
import { toggleLoading } from "../loading/loadingSlice";

const BLANK = "------------";
const INVALID_DATE = "Invalid Date";
const convertToDate = (dateString) => {
  const dateText = dayjs(dateString).format("DD MMM YYYY (ddd)");
  return dateText === INVALID_DATE ? BLANK : dateText;
};

const convertToTime = (timeObject) => {
  const timeText = dayjs(timeObject.time || timeObject).format("hh:mm A");
  return timeText === INVALID_DATE ? BLANK : timeText;
};

export default function MovieSessionDropdownMenu({ movieSession }) {
  const [movieSessions, setMovieSessions] = useState([]);
  const [cinema, setCinema] = useState(movieSession.cinema.name);
  const [date, setDate] = useState(movieSession.timeslot.startDateTime);
  const [timeObject, setTimeObject] = useState({
    sessionId: movieSession.id,
    time: movieSession.timeslot.startDateTime,
  });
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
    setTimeObject({sessionId: "", time: ""});
  };

  const handleDateClick = (dateString) => {
    setDate(dateString);
    setTimeObject({sessionId: "", time: ""});
  };

  const handleTimeObjectClick = (sessionId, dateString) => {
    setTimeObject({
      sessionId,
      time: dateString,
    });
    const nextMovieSession = movieSessions.find(
      (movieSession) => movieSession.id === sessionId
    );
    if (!!nextMovieSession) {
      dispatch(setMovieSession(nextMovieSession));
    }
  };

  useEffect(() => {
    dispatch(toggleLoading(1))
    getMovieSessionsByMovieId(movieSession.movie.id).then((response) => {
      setMovieSessions(response.data);
    }).finally(()=>{dispatch(toggleLoading(-1))});
  }, [movieSession,dispatch]);

  const dropdownIcon = (
    <span className={`movieSessionDropdownIcon`}>
      <DownOutlined />
    </span>
  );

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
            icon={dropdownIcon}
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
            icon={dropdownIcon}
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
                .filter((timeObj) => timeObj.sessionId !== timeObject.sessionId)
                .map(({ sessionId, time: dateString }, index) => (
                  <MovieSessionDropdownForSeat
                    key={`${sessionId}-${index}`}
                    text={convertToTime(dateString)}
                    onClick={() => {
                      handleTimeObjectClick(sessionId, dateString);
                    }}
                  />
                ))}
            </div>
          )}
        >
          <MovieSessionDropdownForSeat
            text={convertToTime(timeObject)}
            onClick={() => {
              setIsTimeObjectOpen(true);
            }}
            icon={dropdownIcon}
          />
        </Dropdown>
      </Col>
    </Row>
  );
}
