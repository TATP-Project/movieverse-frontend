import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";
import "./CountdownTimer.css";
import Timer from "./timer.png";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { setSeatsStatus } from "../seats/seatSelectionSlice";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { useNavigate } from "react-router-dom";

const ShowCounter = ({ minutes, seconds }) => {
  return (
    <div className="show-counter">
        <Row>
            <Col>
              <Row>
                <Col span={8} offset={8}>
                  <img  className="clock" src={Timer} alt="timer" />
                </Col>
              </Row>
              <Row>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
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
    const navigate = useNavigate();

    if (days + hours + minutes + seconds <= 0) {
        dispatch(setSeatsStatus(AVAILABLE));
        return (
          <>
            <ErrorMessage  
                showError={true} 
                context="Your session has been expired" 
                ok={()=>{navigate("/")}} 
            />
          </>
        )
        // navigate("/test");
    } else {
        return <ShowCounter minutes={minutes} seconds={seconds} />;
    }
};

export default CountdownTimer;
