import React, { useState, useEffect } from "react";
import { getSeatsByMovieSessionId, updateSeatsByMovieSessionId } from "../../api/movieSessions";
import SeatTable from "./SeatTable";
import Seat from "./Seat";
import ConfirmButton from "../button/ConfirmButton";
import MovieSessionDropdownForSeat from "../movieSession/MovieSessionDropdownForSeat";
import MovieSessionDropdownTitleForSeat from "../movieSession/MovieSessionDropdownTitleForSeat ";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSeatSelection } from "./seatSelectionSlice";
import "./SeatSelection.css";

const SELECTED = "SELECTED";
const RESERVED = "RESERVED";
const AVAILABLE = "AVAILABLE";
const SOLD = "SOLD";

export default function SeatSelection() {
  const [seats, setSeats] = useState([]);
  const movieSession = useSelector((state) => state.movieSession);
  const dispatch = useDispatch();

  useEffect(() => {
    getSeatsByMovieSessionId(movieSession.id).then((response) => {
      setSeats(response.data);
      console.log(response.data)
    });
  }, [movieSession.id]);

  const movieSessionDate = new Date(movieSession.timeslot.startDateTime);
  const movieSessionDateString = `${movieSessionDate.getDate()} ${movieSessionDate.getMonth()} ${movieSessionDate.getFullYear()} (${movieSessionDate.getDay()})`;

  const seatsIn2DList = seats.reduce((seatLists, seat) => {
    if (seatLists.length === seat.row - 1) {
      seatLists.push([]);
    }
    seatLists[seat.row - 1].push(seat);
    return seatLists;
  }, []);

  const handleClickAvailbleSeat = (seatId) => {
    setSeats(
      seats.map((seat) => {
        if (seat.id === seatId) {
          if (seat.status === AVAILABLE) {
            return {
              ...seat,
              status: SELECTED,
            };
          } else if (seat.status === SELECTED) {
            return {
              ...seat,
              status: AVAILABLE,
            };
          }
        }
        return seat;
      })
    );
  };

  const handleConfirmSeatClick = () => {
    const reservedSeat = seats.filter((seat) => seat.status === SELECTED)
      .map((seat) => seat.status = RESERVED)
      console.log(reservedSeat)
    updateSeatsByMovieSessionId(movieSession.id, reservedSeat).then((response) => {
      setSeatSelection({
        movieSessionId: movieSession.id,
        seats: seats.filter((seat) => seat.status === RESERVED),
      })
    });
  };

  return (
    <div className="seatSelection">
      <Row justify="center">
        <Col>
          <MovieSessionDropdownTitleForSeat text="CINEMA" />
        </Col>
        <Col>
          <MovieSessionDropdownTitleForSeat text="DATE" />
        </Col>
        <Col>
          <MovieSessionDropdownTitleForSeat text="TIME" />
        </Col>
      </Row>
      <div className="houseSeatBox">
        <Row justify="center">
          <Col>
            <MovieSessionDropdownForSeat text={movieSession.cinema.name} />
          </Col>
          <Col>
            <MovieSessionDropdownForSeat text={movieSessionDateString} />
          </Col>
          <Col>
            <MovieSessionDropdownForSeat text={"05:00PM"} />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Row>
              <Col>
                <SeatTable
                  seatsIn2DList={seatsIn2DList}
                  onSeatClick={handleClickAvailbleSeat}
                />
              </Col>
            </Row>
            <Row gutter={12.5} justify="end" className="seatDemoRow">
              <Col>
                <Seat status={AVAILABLE} column={1} showStatus />
              </Col>
              <Col>
                <Seat status={SELECTED} column={1} showStatus />
              </Col>
              <Col>
                <Seat status={RESERVED} column={1} showStatus />
              </Col>
              <Col>
                <Seat status={SOLD} column={1} showStatus />
              </Col>
              <Col span={1} />
            </Row>
          </Col>
        </Row>
      </div>
      <Row justify="center">
        <Col>
          <ConfirmButton onClick={handleConfirmSeatClick} />
        </Col>
      </Row>
    </div>
  );
}
