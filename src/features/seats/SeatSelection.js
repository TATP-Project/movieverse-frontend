import React, { useState, useEffect } from "react";
import { getSeatsByMovieSessionId } from "../../api/movieSessions";
import SeatTable from "./SeatTable";
import Seat from "./Seat";
import ConfirmButton from "../button/ConfirmButton";
import MovieSessionDropdownForSeat from "../movieSession/MovieSessionDropdownForSeat";
import MovieSessionDropdownTitleForSeat from "../movieSession/MovieSessionDropdownTitleForSeat ";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { setSeatSelection } from "./seatSelectionSlice";
import "./SeatSelection.css";

const RESERVED = "RESERVED";
const AVAILABLE = "AVAILABLE";
const SOLD = "SOLD";

export default function SeatSelection() {
  const [seats, setSeats] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getSeatsByMovieSessionId("63a136f331d0f46035bd0ee4").then((response) => {
      setSeats(response.data);
    });
  }, []);

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
      setSeatSelection(seats.filter((seat) => seat.status === RESERVED))
    );
  };

  return (
    <>
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
      <div className="seatSelection">
        <Row justify="center">
          <Col>
            <MovieSessionDropdownForSeat text="YOHO Mall Cinema" />
          </Col>
          <Col>
            <MovieSessionDropdownForSeat text="18 Dec 2022 (Sun)" />
          </Col>
          <Col>
            <MovieSessionDropdownForSeat text="05:00 PM" />
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
                <Seat status={RESERVED} column={1} showStatus />
              </Col>
              <Col>
                <Seat status={SOLD} column={1} showStatus />
              </Col>
              <Col span={1} />
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <ConfirmButton onClick={handleConfirmSeatClick} />
          </Col>
        </Row>
      </div>
    </>
  );
}
