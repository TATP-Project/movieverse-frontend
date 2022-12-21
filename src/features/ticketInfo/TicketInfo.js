import "./TicketInfo.css";
import TicketInfoItem from "./TicketInfoItem";
import { useSelector } from "react-redux";
import SeatsInfoItem from "./SeatsInfoItem";
import FoodInfoItem from "./FoodInfoItem";
import TotalAmount from "./TotalAmount";
import PaymentMethod from "./payment/PaymentMethod";
import ConfirmButton from "../button/ConfirmButton";

export default function TicketInfo() {
    const movie = useSelector((state) => state.movie);
    const session = useSelector((state) => state.movieSession);
    const seats = useSelector((state) => state.seatSelection.seats);
    const food = useSelector((state) => state.foodSelection);
    const date = new Date(session.timeslot.startDateTime);
    const calculateTotalAmount = () => {
        var foodTotal = Object.keys(food).reduce((total, id) => {
            var thisFood = food[id];
            total += parseInt(thisFood.count) * parseInt(thisFood.price);
            return total;
        }, 0);

        var seatTotal =
            parseInt(session.price) * parseInt(Object.keys(seats).length);
        return foodTotal + seatTotal;
    };
    return (
        <div>
            <div className="wrapper">
                <div className={"movieTitle"} style={{ width: "100%" }}>
                    {movie.name}
                </div>
                <div className={"ticketInfo"}>
                    <div>
                        <img
                            className={"ticketInfoImage"}
                            src={"data:image/png;base64," + movie.image.data}
                            alt={movie.name}
                        />
                    </div>
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
                            value={session.house.name}
                        />
                        <SeatsInfoItem header="Seats" seats={seats} />
                        <FoodInfoItem header="F&B" food={food} />
                    </div>
                </div>
                <TotalAmount amount={calculateTotalAmount()} />
                <PaymentMethod />
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <ConfirmButton />
            </div>
        </div>
    );
}
