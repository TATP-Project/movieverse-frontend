import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MovieInfo from "../features/movieTimeslots/MovieInfo";
import MovieSessions from "../features/movieTimeslots/MovieSessions";
import { useNavigate } from "react-router-dom";

export default function MovieTimeslotsPage() {
    const history = useSelector((state) => state.history);
    const navigate = useNavigate()
    const criticalSection =['/food','/ticketinfo','/complete']
    useEffect(() => {        
        console.log(history)
    }, [history])
    return (!criticalSection.includes(history)) ?      
     (
        <>
            <div className={"title"}>Now on Sale</div>
            <div className={"body"}>
                <MovieInfo />
                <MovieSessions />
            </div>
        </>
    )
    :<div className="sessionExpired"><p>Session Not Found/Expired</p><button onClick={()=>{navigate('/');navigate(0);}}>Back To Home</button></div> //incorrect history
}
