import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FoodList from "../features/food/FoodList";
import StatusBar from "../features/movie/StatusBar";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../features/button/BackToHomeButton";

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
    :<BackToHomeButton/> //incorrect history
}
