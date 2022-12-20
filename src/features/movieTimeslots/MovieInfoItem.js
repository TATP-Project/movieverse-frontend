import React from "react";
import "./MovieInfo.css";

export default function MovieInfoItem(props) {
    return (
        <>
            <div>
                <img src={props.logo} alt={props.alt} />
            </div>
            <div className={"tableHeader"}>{props.header}</div>
            <div>{props.value}</div>
        </>
    );
}
