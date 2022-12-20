import React, { useState, useEffect } from "react";
import { getSeatsByMovieSessionId } from "../../api/movieSessions";
import SeatTable from "./SeatTable";
import Seat from "./Seat";
import ConfirmButton from "../button/ConfirmButton";
import MovieSessionDropdownForSeat from "../movieSession/MovieSessionDropdownForSeat";
import MovieSessionDropdownTitleForSeat from "../movieSession/MovieSessionDropdownTitleForSeat ";
import MovieSessionDropdownMenu from "../movieSession/MovieSessionDropdownMenu"
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSeatSelection } from "./seatSelectionSlice";
import * as dayjs from "dayjs";
import "./SeatSelection.css";

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
    });
  }, [movieSession.id]);

  const movieSessionDate = new Date(movieSession.timeslot.startDateTime);

  const seatsIn2DList = seats.reduce((seatLists, seat) => {
    if (seatLists.length === seat.row - 1) {
      seatLists.push([]);
    }
    seatLists[seat.row - 1].push(seat);
    return seatLists;
  }, []);

  const isConfirmButtonDisabled = !seats.some((seat) => seat.status === RESERVED)

  const handleClickAvailbleSeat = (seatId) => {
    setSeats(
      seats.map((seat) => {
        if (seat.id === seatId) {
          if (seat.status === AVAILABLE) {
            return {
              ...seat,
              status: RESERVED,
            };
          } else if (seat.status === RESERVED) {
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
    dispatch(
      setSeatSelection({
        movieSessionId: movieSession.id,
        seats: seats.filter((seat) => seat.status === RESERVED),
      })
    );
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
            <MovieSessionDropdownMenu movieSession={movieSession} />
          </Col>
          {/* <Col>
            <MovieSessionDropdownForSeat
              text={`${dayjs(movieSessionDate).format("DD MMM YYYY (ddd)")}`}
            />
          </Col>
          <Col>
            <MovieSessionDropdownForSeat text={`${
              dayjs(movieSessionDate).format("HH:mm A")
            }`} />
          </Col> */}
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
          <ConfirmButton onClick={handleConfirmSeatClick} disabled={isConfirmButtonDisabled}/>
        </Col>
      </Row>
    </div>
  );
}
