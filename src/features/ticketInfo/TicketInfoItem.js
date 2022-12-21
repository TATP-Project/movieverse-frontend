import React from "react";
import "./TicketInfo.css";

export default function TicketInfoItem(props) {
    return (
        <div className="ticketInfoItem">
            <div className={"ticketTableHeader"}>{props.header}</div>
            <div>{props.value}</div>
        </div>
    );
}
