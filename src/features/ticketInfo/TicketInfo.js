import "./TicketInfo.css";
import TicketInfoItem from "./TicketInfoItem";
import { useDispatch, useSelector } from "react-redux";

import PaymentMethod from "./payment/PaymentMethod";
import ConfirmButton from "../button/ConfirmButton";
import { useNavigate } from "react-router-dom";
import { postTicket } from "../../api/ticketInfo";
import { setTicketId } from "./ticketSlice";
import CountdownTimer from "../counter/CountdownTimer";
import { updateSeatsByMovieSessionId } from "../../api/movieSessions";
import { pushHistory } from "../history/historySlice";
import Orders from "./Orders";

export default function TicketInfo() {
    const navigate = useNavigate();
    const movie = useSelector((state) => state.movie);
    const session = useSelector((state) => state.movieSession);
    const seats = useSelector((state) => state.seatSelection.seats);
    const food = useSelector((state) => state.foodSelection);
    const date = new Date(session.timeslot.startDateTime);
    const dispatch = useDispatch();
    const targetDate = useSelector((state) => state.countdownTimer.targetDate);

    const houseWordToNumber = (houseWord) => {
        var number = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
        };
        return number[houseWord.split(" ").pop().toLowerCase()];
    };

    const handleConfirmTicketInfo = () => {
        var foodList = [];
        Object.keys(food).forEach((id) => {
            foodList = foodList.concat(Array(food[id].count).fill(id));
        });
        var ticketInfoJson = {
            movieSessionId: session.id,
            seats: seats,
            food: foodList,
        };
        postTicket(ticketInfoJson).then((response) => {
            dispatch(setTicketId(response.data));
        });

        const seatToSell = seats.map((seat) => {
            return { ...seat, status: "SOLD" };
        });

        updateSeatsByMovieSessionId(session.id, seatToSell).then((response) => {
            dispatch(pushHistory("/complete"));
            navigate("/complete");
        });
    };

    return (
        <div>
            <div className="wrapper">
                <div className={"movieTitle"} style={{ width: "100%" }}>
                    <CountdownTimer targetDate={targetDate} />
                    {movie.name}
                </div>
                <div className={"ticketInfo"}>
                    <div
                        style={{
                            background: `url("${movie.image}")`,
                            width: "300px",
                            backgroundSize: "cover",
                        }}
                    ></div>
                    {/* <div>
                        <img
                            className={"ticketInfoImage"}
                            src={movie.image}
                            alt={movie.name}
                            style={{
                                background: `url("${movie.image}")`,
                            }}
                        />
                    </div> */}
                    <div className="ticketInfoTable">
                        <TicketInfoItem
                            header="Cinema"
                            value={session.cinema.name}
                        />
                        <TicketInfoItem
                            header="Date"
                            value={
                                date.getDate() +
                                "/" +
                                (date.getMonth() + 1) +
                                "/" +
                                date.getFullYear()
                            }
                        />
                        <TicketInfoItem
                            header="Time"
                            value={date.getHours() + ":" + date.getMinutes()}
                        />
                        <TicketInfoItem
                            header="House"
                            value={houseWordToNumber(session.house.name)}
                        />
                    </div>
                </div>
                <Orders food={food} seats={seats} session={session} />
                <PaymentMethod />
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <ConfirmButton onClick={handleConfirmTicketInfo} />
            </div>
        </div>
    );
}
