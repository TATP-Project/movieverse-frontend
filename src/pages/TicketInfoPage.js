import React from "react";
import TicketInfo from "../features/ticketInfo/TicketInfo.js";
import StatusBar from "../features/movie/StatusBar";

export default function TicketInfoPage() {
    return (
        <div>
            <StatusBar stage={3} />
            <TicketInfo />
            
        </div>
    );
}
