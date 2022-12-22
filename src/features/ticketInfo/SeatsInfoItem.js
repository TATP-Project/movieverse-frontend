import React from "react";
import "./TicketInfo.css";
import { Col, Row } from 'antd';

export default function SeatsInfoItem(props) {
    const {price} = props;
    const groupBy = (arr, property) => {
        return arr.reduce(function (memo, x) {
            if (!memo[x[property]]) {
                memo[x[property]] = [];
            }
            memo[x[property]].push(x);
            return memo;
        }, {});
    };
    var seatsGroupByRow = groupBy(props.seats, "row");
    var rows = Object.keys(seatsGroupByRow);

    return (
        <>
                <Col span={8} >
                    <Row justify="start">
                        <div className={"ticketTableHeader"}>{props.header}</div>
                    </Row>
                </Col>
                <Col span={8}>
                        {rows.map((row) => {
                            var rowChar = String.fromCharCode(64 + parseInt(row));
                            var seatsStr =
                                " (" +
                                seatsGroupByRow[row]
                                    .map((seat) => seat.column)
                                    .join(", ") +
                                ")";
                            return (
                                <Row>
                                    <div className="multipleRow">
                                        {"Row " + rowChar + seatsStr}
                                    </div>
                                </Row>
                            );
                        })}
                </Col>
                <Col span={8}>
                {rows.map((row) => {
                        var subPrice = seatsGroupByRow[row].length * price
                        return (
                            <Row justify="end">
                                <div className="multipleRow">
                                    {"$" + subPrice}
                                </div>
                            </Row>
                        );
                        })}
                </Col>
        </>
        // <div className="ticketInfoItem">
        //     <div className={"ticketTableHeader"}>{props.header}</div>
        //     <div>
        //         {rows.map((row) => {
        //             var rowChar = String.fromCharCode(64 + parseInt(row));
        //             var seatsStr =
        //                 " (" +
        //                 seatsGroupByRow[row]
        //                     .map((seat) => seat.column)
        //                     .join(", ") +
        //                 ")";
        //             return (
        //                 <div className="multipleRow">
        //                     {"Row " + rowChar + seatsStr}
        //                 </div>
        //             );
        //         })}
        //     </div>
        // </div>
    );
}
