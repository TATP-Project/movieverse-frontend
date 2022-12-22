import React, { useEffect } from "react";
import TicketInfo from "../features/ticketInfo/TicketInfo.js";
import StatusBar from "../features/movie/StatusBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TicketInfoPage() {
    const history = useSelector((state) => state.history);
    const navigate = useNavigate()
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
    :<div className="sessionExpired"><p>Session Not Found/Expired</p><button onClick={()=>{navigate('/');navigate(0);}}>Back To Home</button></div> //incorrect history
}
