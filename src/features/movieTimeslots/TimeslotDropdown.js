import React from "react";
import "./TimeslotDropdown.css";

export default function TimeslotDropdown(props) {
    const toggleMenu = () => {
        props.setSelectedDropdown(props.index);
    };
    var date = new Date(props.sessions[0].timeslot.startDateTime);
    return (
        <div>
            {props.showMenu ? <div className="dropdownMenu">hello</div> : null}
            <div className={"dropdownItem"}>
                <div className={"dropdownBox"}>
                    <div>{date.getDate() + "/" + (date.getMonth() + 1)}</div>
                    <div>{date.getHours() + ":" + date.getMinutes()}</div>
                    <div>{"$" + props.sessions[0].price}</div>
                </div>
                <div></div>
                <div className={"dropdownButton"} onClick={toggleMenu}>
                    &#11167;
                </div>
            </div>
        </div>
    );
}
