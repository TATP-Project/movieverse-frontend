import {React,useEffect} from "react";
import { useSelector } from "react-redux";
import FoodList from "../features/food/FoodList";
import StatusBar from "../features/movie/StatusBar";
import BackToHomeButton from "../features/button/BackToHomeButton";
import { updateSeatsByMovieSessionId } from "../api/movieSessions";
const FOOD_PAGE_ID = "food";
export default function ListOfMoviesPage() {
  const history = useSelector((state) => state.history);
  // useEffect(() => {
  //   console.log(history);
  // }, [history]);

  useEffect(() => {
    if (history === "/food") {
      const url = new URL(window.location);
      const urlString = `${url.href}#${FOOD_PAGE_ID}`;
      window.history.pushState({}, "", urlString);
    const seats = useSelector((state) => state.seatSelection.seats);
    const session = useSelector((state) => state.movieSession);
    const seatToAvailable = seats.map((seat) => {
        return { ...seat, status: "AVAILABLE" };
    });
    window.addEventListener('beforeunload', function (e) {
        e.returnValue = updateSeatsByMovieSessionId(session.id, seatToAvailable);
    });
    
   
      window.onpopstate = () => {
        if (window.confirm("Are you going back?")) {
          window.history.back();
        } else {
          window.history.pushState({}, "", urlString);
        }
      };
    }

    return () => {
      window.onpopstate = null;
    };
  }, [history]);

  return history === "/food" ? (
    <div>
      <StatusBar stage={2} id={FOOD_PAGE_ID} />
      <FoodList />
    </div>
  ) : (
    <BackToHomeButton />
  ); //incorrect history
}
