import React from "react";
import { setMovieSession } from "./movieSessionSlice";
import "./TimeslotDropdown.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TimeslotDropdown(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggleMenu = () => {
        if (props.showMenu) {
            props.setSelectedDropdown(-1);
        } else {
            props.setSelectedDropdown(props.index);
        }
    };
    const selectSession = (session) => {
        dispatch(setMovieSession(session));
        navigate("/new-order");
    };
    var date = new Date(props.sessions[0].timeslot.startDateTime);
    return (
        <div>
            <div style={{ position: "relative" }}>
                {props.showMenu ? (
                    <div className="dropdownMenu">
                        {props.sessions.map((session, index) => {
                            return (
                                <div
                                    className="dropdownMenuItem"
                                    onClick={() => selectSession(session)}
                                    key={index}
                                >
                                    <div>
                                        {date.getDate() +
                                            "/" +
                                            (date.getMonth() + 1)}
                                    </div>
                                    <div>
                                        {date.getHours() +
                                            ":" +
                                            date.getMinutes()}
                                    </div>
                                    <div>{"$" + props.sessions[0].price}</div>
                                    <div></div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                <div className={"dropdownItem"}>
                    <div className={"sessionDropdownBox"} onClick={toggleMenu}>
                        <div>
                            {date.getDate() + "/" + (date.getMonth() + 1)}
                        </div>
                        <div>{date.getHours() + ":" + date.getMinutes()}</div>
                        <div>{"$" + props.sessions[0].price}</div>
                    </div>
                    <div></div>
                    <div className={"dropdownButton"} onClick={toggleMenu}>
                        &#11167;
                    </div>
                </div>
            </div>
        </div>
    );
}
