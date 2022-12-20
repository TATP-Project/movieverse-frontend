import React from "react";
import { setMovieSession } from "./movieSessionSlice";
import "./TimeslotDropdown.css";
import { useDispatch } from "react-redux";

export default function TimeslotDropdown(props) {
    const dispatch = useDispatch();
    const toggleMenu = () => {
        if (props.showMenu) {
            props.setSelectedDropdown(-1);
        } else {
            props.setSelectedDropdown(props.index);
        }
    };
    const selectSession = (session) => {
        dispatch(setMovieSession(session));
    };
    var date = new Date(props.sessions[0].timeslot.startDateTime);
    return (
        <div>
            <div style={{ position: "relative" }}>
                {props.showMenu ? (
                    <div className="dropdownMenu">
                        {props.sessions.map((session) => {
                            return (
                                <div
                                    className="dropdownMenuItem"
                                    onClick={() => selectSession(session)}
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
                    <div className={"sessionDropdownBox"}>
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
