import {React,useEffect} from "react";
import FoodList from "../features/food/FoodList";
import StatusBar from "../features/movie/StatusBar";
import { useSelector } from "react-redux";
import { updateSeatsByMovieSessionId } from "../api/movieSessions";
export default function ListOfMoviesPage() {
    const seats = useSelector((state) => state.seatSelection.seats);
    const session = useSelector((state) => state.movieSession);
    const seatToAvailable = seats.map((seat) => {
        return { ...seat, status: "AVAILABLE" };
    });
    window.addEventListener('beforeunload', function (e) {
        e.returnValue = updateSeatsByMovieSessionId(session.id, seatToAvailable);
    });
    
   
    return (
        <div>
            <StatusBar stage={2} />
            <FoodList />
        </div>
    );
}
