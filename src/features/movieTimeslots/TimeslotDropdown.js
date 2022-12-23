import React from "react";
import { setMovieSession } from "./movieSessionSlice";
import "./TimeslotDropdown.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { pushHistory } from "../history/historySlice";

export default function TimeslotDropdown(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownBoxClass, setDropdownBoxClass] =
        useState("sessionDropdownBox");
    const toggleMenu = () => {
        if (props.showMenu) {
            props.setSelectedDropdown(-1);
            setDropdownBoxClass("sessionDropdownBox");
        } else {
            props.setSelectedDropdown(props.index);
            setDropdownBoxClass("sessionDropdownBox dropdownSelected");
        }
    };
    const selectSession = (session) => {
        dispatch(setMovieSession(session));
        dispatch(pushHistory("/new-order"));
        navigate("/new-order");
    };
    var date = new Date(props.sessions[0].timeslot.startDateTime);
    return (
        <div>
            <div style={{ position: "relative" }}>
                {props.showMenu ? (
                    <div className="dropdownMenu">
                        {props.sessions.map((session, index) => {
                            const date = new Date(
                                session.timeslot.startDateTime
                            );
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
                    <div className={dropdownBoxClass} onClick={toggleMenu}>
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
