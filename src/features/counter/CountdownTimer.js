import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";
import "./CountdownTimer.css";
import Timer from "./timer.png";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { setSeatsStatus } from "../seats/seatSelectionSlice";

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Expired!!!</span>
            <p>Please select a future date and time.</p>
        </div>
    );
};

const ShowCounter = ({ minutes, seconds }) => {
    return (
        <div className="show-counter">
            <Row>
                <Col>
                    <Row>
                        <Col span={8} offset={8}>
                            <img className="clock" src={Timer} alt="timer" />
                        </Col>
                    </Row>
                    <Row>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <DateTimeDisplay
                                value={minutes}
                                type={"Mins"}
                                isDanger={false}
                            />
                            <p>:</p>
                            <DateTimeDisplay
                                value={seconds}
                                type={"Seconds"}
                                isDanger={false}
                            />
                        </div>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

const AVAILABLE = "AVAILABLE";
const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    const dispatch = useDispatch();

    if (days + hours + minutes + seconds <= 0) {
        dispatch(setSeatsStatus(AVAILABLE));
        return <ExpiredNotice />;
    } else {
        return <ShowCounter minutes={minutes} seconds={seconds} />;
    }
};

export default CountdownTimer;
