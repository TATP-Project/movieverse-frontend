import React from "react";
import { Row, Col } from "antd";
import Seat from "./Seat";
import SeatRowLabel from "./SeatRowLabel";
import "./SeatTable.css";
import Screen from "./Screen.png";

export default function SeatTable({ seatsIn2DList, onSeatClick }) {
  return (
    <div>
      <Row justify="center" className="bottomMargin">
        <Col>
          <img src={Screen} width={313} height={82} alt="screen" />
        </Col>
      </Row>
      {seatsIn2DList.map((seatList, rowIndex) => {
        let verticalMarginClass = "";
        if (rowIndex === 2) {
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
              if (columnIndex === 1 || columnIndex === 9) {
                horizontalMarginClass += "rightMargin";
              }
              if (columnIndex === 0 || columnIndex === 2 || columnIndex === 10) {
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
