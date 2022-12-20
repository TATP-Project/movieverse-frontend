import React from "react";
import "./TicketInfo.css";

export default function SeatsInfoItem(props) {
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
        <div className="ticketInfoItem">
            <div className={"ticketTableHeader"}>{props.header}</div>
            <div>
                {rows.map((row) => {
                    var rowChar = String.fromCharCode(64 + parseInt(row));
                    var seatsStr =
                        " (" +
                        seatsGroupByRow[row]
                            .map((seat) => seat.column)
                            .join(", ") +
                        ")";
                    return (
                        <div className="multipleRow">
                            {"Row " + rowChar + seatsStr}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
