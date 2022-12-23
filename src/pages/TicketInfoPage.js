import React, { useEffect } from "react";
import TicketInfo from "../features/ticketInfo/TicketInfo.js";
import StatusBar from "../features/movie/StatusBar";
import { useSelector } from "react-redux";
import BackToHomeButton from "../features/button/BackToHomeButton.js";
import { updateSeatsByMovieSessionId } from "../api/movieSessions";

const TICKET_PAGE_ID = "ticket";
export default function TicketInfoPage() {
  const history = useSelector((state) => state.history);
  // useEffect(() => {
  //   console.log(history);
  // }, [history]);
  const seats = useSelector((state) => state.seatSelection.seats);
  const session = useSelector((state) => state.movieSession);
  const seatToAvailable = seats.map((seat) => {
      return { ...seat, status: "AVAILABLE" };
  });
  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
        e.returnValue = updateSeatsByMovieSessionId(session.id, seatToAvailable);
        return () => {
            window.onbeforeunload = null;
        }
    })
  }, [session.id,seatToAvailable]);
    
  useEffect(() => {
    if (history === "/ticketinfo") {
      const url = new URL(window.location);
      const urlString = `${url.href}#${TICKET_PAGE_ID}`;
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
  }, [history]);

  return history === "/ticketinfo" ? (
    <div>
      <StatusBar stage={3} id={TICKET_PAGE_ID} />
      <TicketInfo />
            
    </div>
  ) : (
    <BackToHomeButton />
  ); //incorrect history
}
