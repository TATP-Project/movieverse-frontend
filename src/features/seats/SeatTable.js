import { Row } from "antd";
import React from "react";

export default function SeatTable({ seats }) {
  const seatsIn2DList = seats.reduce((seatLists, seat) => {
    if (seatLists.length === seat.row - 1) {
      seatLists.push([]);
    }
    seatLists[seat.row - 1].push(seat);
    return seatLists;
  }, []);

  return (
    <div>
      {seatsIn2DList.map((seatList, index) => (
        <Row key={`seat-list${index}`}>
          {seatList.map((seat) => (
            <Col>
              <Seat
                key={seat.id}
                row={seat.row}
                col={seat.column}
                status={seat.status}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}
