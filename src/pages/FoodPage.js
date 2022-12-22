import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FoodList from "../features/food/FoodList";
import StatusBar from "../features/movie/StatusBar";
import { useNavigate } from "react-router-dom";

const FOOD_PAGE_ID = "food";
export default function ListOfMoviesPage() {
  const history = useSelector((state) => state.history);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(history);
  }, [history]);

  useEffect(() => {
    if (history === "/food") {
      const url = new URL(window.location);
      const urlString = `${url.href}#${FOOD_PAGE_ID}`;
      window.history.pushState({}, "", urlString);
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
  }, []);

  return history === "/food" ? (
    <div >
      <StatusBar stage={2} id={FOOD_PAGE_ID}/>
      <FoodList />
    </div>
  ) : (
    <div className="sessionExpired">
      <p>Session Not Found/Expired</p>
      <button
        onClick={() => {
          navigate("/");
          navigate(0);
        }}
      >
        Back To Home
      </button>
    </div>
  ); //incorrect history
}
