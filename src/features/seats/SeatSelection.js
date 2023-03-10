import React, { useState, useEffect } from "react";
import {
    getSeatsByMovieSessionId,
    updateSeatsByMovieSessionId,
} from "../../api/movieSessions";
import SeatTable from "./SeatTable";
import Seat from "./Seat";
import ConfirmButton from "../button/ConfirmButton";
import MovieSessionDropdownTitleForSeat from "../movieSession/MovieSessionDropdownTitleForSeat ";
import MovieSessionDropdownMenu from "../movieSession/MovieSessionDropdownMenu";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSeatSelection } from "./seatSelectionSlice";
import "./SeatSelection.css";
import { useNavigate } from "react-router-dom";
import { toggleLoading } from "../loading/loadingSlice";
import { pushHistory } from "../history/historySlice";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { setTimer } from "../counter/countdownTimerSlice";

const SELECTED = "SELECTED";
const RESERVED = "RESERVED";
const AVAILABLE = "AVAILABLE";
const SOLD = "SOLD";

export default function SeatSelection() {
    const [seats, setSeats] = useState([]);
    const movieSession = useSelector((state) => state.movieSession);
    const [isShown, setIsShown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(toggleLoading(1));
        getSeatsByMovieSessionId(movieSession.id)
            .then((response) => {
                setSeats(response.data);
            })
            .finally(() => {
                dispatch(toggleLoading(-1));
            });
    }, [movieSession.id, dispatch]);

    const isConfirmButtonDisabled = !seats.some(
        (seat) => seat.status === SELECTED
    );

    const seatsIn2DList = seats.reduce((seatLists, seat) => {
        if (seatLists.length === seat.row - 1) {
            seatLists.push([]);
        }
        seatLists[seat.row - 1].push(seat);
        return seatLists;
    }, []);

    const handleClickAvailbleSeat = (seatId) => {
        setSeats(
            seats.map((seat) => {
                if (seat.id === seatId) {
                    if (seat.status === AVAILABLE) {
                        return {
                            ...seat,
                            status: SELECTED,
                        };
                    } else if (seat.status === SELECTED) {
                        return {
                            ...seat,
                            status: AVAILABLE,
                        };
                    }
                }
                return seat;
            })
        );
    };
    const handleConfirmSeatClick = () => {
        const selectedSeat = seats.filter((seat) => seat.status === SELECTED);

        const seatsToReserve = selectedSeat.map((seat) => {
            return { ...seat, status: RESERVED };
        });
        updateSeatsByMovieSessionId(movieSession.id, seatsToReserve)
            .then((response) => {
                dispatch(
                    setSeatSelection({
                        movieSessionId: movieSession.id,
                        seats: response.data,
                    })
                );
                const TEN_MINS_IN_MS = 15 * 1000;
                const NOW_IN_MS = new Date().getTime();
                const targetDate = NOW_IN_MS + TEN_MINS_IN_MS;
                dispatch(pushHistory("/food"));
                dispatch(setTimer(targetDate));
                navigate("/food");
            })
            .catch((error) => {
                setIsShown(true);
            });
    };

    const error = {
        title: "Seat Not Available",
        context:
            "Your selected Seat(s) have already become unavailable. Please choose other seat(s).",
    };

    return (
        <div className="seatSelection">
            <Row justify="center">
                <Col>
                    <MovieSessionDropdownTitleForSeat text="CINEMA" />
                </Col>
                <Col>
                    <MovieSessionDropdownTitleForSeat text="DATE" />
                </Col>
                <Col>
                    <MovieSessionDropdownTitleForSeat text="TIME" />
                </Col>
            </Row>
            <div className="houseSeatBox">
                <Row justify="center">
                    <Col>
                        <MovieSessionDropdownMenu movieSession={movieSession} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Row>
                            <Col>
                                <SeatTable
                                    seatsIn2DList={seatsIn2DList}
                                    onSeatClick={handleClickAvailbleSeat}
                                />
                            </Col>
                        </Row>
                        <Row
                            gutter={12.5}
                            justify="end"
                            className="seatDemoRow"
                        >
                            <Col>
                                <Seat
                                    status={AVAILABLE}
                                    column={1}
                                    showStatus
                                />
                            </Col>
                            <Col>
                                <Seat status={SELECTED} column={1} showStatus />
                            </Col>
                            <Col>
                                <Seat status={RESERVED} column={1} showStatus />
                            </Col>
                            <Col>
                                <Seat status={SOLD} column={1} showStatus />
                            </Col>
                            <Col span={1} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <Row justify="center">
                <Col>
                    <ConfirmButton
                        onClick={handleConfirmSeatClick}
                        disabled={isConfirmButtonDisabled}
                    />
                </Col>
            </Row>
            {isShown && (
                <ErrorMessage
                    error={error}
                    ok={() => {
                        navigate("/");
                    }}
                />
            )}
        </div>
    );
}
