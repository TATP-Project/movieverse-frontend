import React, { useState, useEffect } from "react";
import { getSeatsByMovieSessionId } from "../api/movieSessions";
import SeatTable from "../features/seats/SeatTable";
import ConfirmSeatButton from "../features/seats/ConfirmSeatButton";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { setSeatSelection } from "../features/seats/seatSelectionSlice";

const RESERVED = "RESERVED";
const AVAILABLE = "AVAILABLE";

export default function SelectingSeatPage() {
  const [seats, setSeats] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getSeatsByMovieSessionId("63a01924a773310c1b950d12").then((response) => {
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
    <div>
      <Row justify="center">
        <Col>
          <SeatTable
            seatsIn2DList={seatsIn2DList}
            onSeatClick={handleClickAvailbleSeat}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <ConfirmSeatButton onClick={handleConfirmSeatClick} />
        </Col>
      </Row>
    </div>
  );
}
