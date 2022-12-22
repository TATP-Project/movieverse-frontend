import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StatusBar from "../features/movie/StatusBar";
import SeatSelection from "../features/seats/SeatSelection";
import { useNavigate } from "react-router-dom";

export default function SeatSelectionPage() {
  const history = useSelector((state) => state.history);
  const navigate = useNavigate()
  const criticalSection =['/food','/ticketinfo','/complete']
  useEffect(() => {
    console.log(history)
  }, [history])
  return (!criticalSection.includes(history)) ?
    (
      <div className={"body"}>
        <StatusBar stage={1} />
        <SeatSelection />
      </div>
    )
    :<div className="sessionExpired"><p>Session Not Found/Expired</p><button onClick={()=>{navigate('/');navigate(0);}}>Back To Home</button></div> //incorrect history
}
