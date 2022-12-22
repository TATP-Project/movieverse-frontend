import React, { useEffect } from "react";
import TicketInfo from "../features/ticketInfo/TicketInfo.js";
import StatusBar from "../features/movie/StatusBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TICKET_PAGE_ID = "ticket";
export default function TicketInfoPage() {
  const history = useSelector((state) => state.history);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(history);
  }, [history]);

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
  }, []);

  return history === "/ticketinfo" ? (
    <div >
      <StatusBar stage={3} id={TICKET_PAGE_ID} />
      <TicketInfo />
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
