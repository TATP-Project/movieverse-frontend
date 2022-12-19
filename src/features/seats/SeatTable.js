import React from "react";
import { Row, Col } from "antd";
import Seat from "./Seat";
import SeatRowLabel from "./SeatRowLabel";
import "./SeatTable.css";

export default function SeatTable({ seatsIn2DList, onSeatClick }) {
  return (
    <div>
      {seatsIn2DList.map((seatList, rowIndex) => {
        let verticalMarginClass = "";
        if (rowIndex === 3) {
          verticalMarginClass += "bottomMargin";
        }

        return (
          <Row
            key={`seat-list${rowIndex}`}
            justify="center"
            className={`row ${verticalMarginClass}`}
          >
            <Col>
              <SeatRowLabel index={rowIndex} />
            </Col>
            {seatList.map((seat, columnIndex) => {
              let horizontalMarginClass = "";
              if (columnIndex === 2 || columnIndex === 6 || columnIndex === 9) {
                horizontalMarginClass += "rightMargin";
              }
              if (columnIndex === 0 || columnIndex === 3 || columnIndex === 7) {
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
            <Col>
              <SeatRowLabel index={rowIndex} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
