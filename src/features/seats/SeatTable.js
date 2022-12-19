import React from "react";
import { Row, Col } from "antd";
import Seat from "./Seat";
import "./SeatTable.css";

export default function SeatTable({ seatsIn2DList, onSeatClick }) {
  return (
    <div>
      {seatsIn2DList.map((seatList, index) => (
        <Row key={`seat-list${index}`}>
          {seatList.map((seat, index) => {
               let horizontalMarginClass = "";
            if (index === 2 || index === 6 || index === 9) {
              horizontalMarginClass += "rightMargin";
            }
            if (index === 0 || index === 3 || index === 7) {
              horizontalMarginClass += " leftMargin";
            }
            return (
              <Col key={seat.id} className={horizontalMarginClass}>
                <Seat
                  id={seat.id}
                  column={seat.column}
                  status={seat.status}
                  onSeatClick={onSeatClick}
                />
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
}
