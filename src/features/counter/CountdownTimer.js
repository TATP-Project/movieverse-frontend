import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";
import "./CountdownTimer.css";
import Timer from "./timer.png";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSeatSelection, setSeatsStatus } from "../seats/seatSelectionSlice";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { useNavigate } from "react-router-dom";
import { updateSeatsByMovieSessionId } from "../../api/movieSessions";
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
    const movieSession = useSelector((state) => state.movieSession);
    const seats = useSelector((state) => state.seatSelection);

    const error = {
      title: "Session Expired",
      context: 'Your session has been expired' ,
    }
    
    if (days + hours + minutes + seconds === 0) {
        dispatch(setSeatsStatus(AVAILABLE));
        updateSeatsByMovieSessionId(movieSession.id, seats)
          .then((response) => {
            dispatch(setSeatSelection({
              movieSessionId: movieSession.id,
              seats: response.data,
            }))
            navigate("/food");
          })
          .catch((error) => {
            console.log(error)
        });

        return (
          <>
            <ErrorMessage  
                error={error}
                ok={()=>{navigate("/")}} 
            />
          </>
        )
    } else if (days + hours + minutes + seconds > 0){
        return <ShowCounter minutes={minutes} seconds={seconds} />;
    }
};

export default CountdownTimer;
