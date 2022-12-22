import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FoodList from "../features/food/FoodList";
import StatusBar from "../features/movie/StatusBar";
import { useNavigate } from "react-router-dom";

export default function ListOfMoviesPage() {
    const history = useSelector((state) => state.history);
    const navigate = useNavigate()
    useEffect(() => {        
        console.log(history)
    }, [history])

    return history === "/food" ?        
    (
        <div>
            <StatusBar stage={2} />
            <FoodList />
        </div>
    )
    :<div className="sessionExpired"><p>Session Not Found/Expired</p><button onClick={()=>{navigate('/');navigate(0);}}>Back To Home</button></div> //incorrect history
}
