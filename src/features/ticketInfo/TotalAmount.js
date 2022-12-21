import React from "react";
import "./TicketInfo.css";

export default function TotalAmount(props) {
    console.log(props.amount);
    return (
        <div className="totalAmount">
            <div></div>
            <div className="amountContent">Total Amount</div>
            <div className="price">${props.amount}</div>
        </div>
    );
}
