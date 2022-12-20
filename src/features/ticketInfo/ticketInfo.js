import "./TicketInfo.css";
import TicketInfoItem from "./TicketInfoItem";
import { useSelector } from "react-redux";
import SeatsInfoItem from "./SeatsInfoItem";

export default function TicketInfo() {
    const movie = useSelector((state) => state.movie);
    const session = useSelector((state) => state.movieSession);
    const seats = useSelector((state) => state.seatSelection.seats);
    const date = new Date(session.timeslot.startDateTime);

    return (
        <div>
            <div className={"foreground"}>
                <div>
                    <img
                        className={"infoImage"}
                        src={"data:image/png;base64," + movie.image.data}
                        alt={movie.name}
                    />
                </div>
                <div className={"ticketInfo"}>
                    <div className={"movieTitle"}>{movie.name}</div>
                    <hr />
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
                    <TicketInfoItem header="House" value={session.house.name} />
                    <SeatsInfoItem header="Seats" seats={seats} />
                    <TicketInfoItem header="F&B" value={"TBC"} />
                </div>
            </div>
        </div>
    );
}
