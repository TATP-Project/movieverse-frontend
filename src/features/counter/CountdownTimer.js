import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';
import './CountdownTimer.css'
import Timer from "./timer.png"
import { Row, Col } from "antd";

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
                <img className="clock" src={Timer} alt="timer" />
            </Col>
        </Row>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      
    </div>
  );
};

const CountdownTimer = ({targetDate}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
