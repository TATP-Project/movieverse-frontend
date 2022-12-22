import React, { useEffect } from "react";
import TicketInfo from "../features/ticketInfo/TicketInfo.js";
import StatusBar from "../features/movie/StatusBar";
import { useSelector } from "react-redux";
import BackToHomeButton from "../features/button/BackToHomeButton.js";

export default function TicketInfoPage() {
    const history = useSelector((state) => state.history);
    useEffect(() => {
        console.log(history)
    }, [history])

    return history === "/ticketinfo" ?     
     (
        <div>
            <StatusBar stage={3} />
            <TicketInfo />
        </div>
    )
    :<BackToHomeButton/> //incorrect history
}
