import React from "react";
import "./MovieCard.css";

export default function MovieCard(props) {
    const { movie } = props;
    return (
        <div className={"movieCard"}>
            <div className={"image imageOne"}>
                <img
                    src={"data:image/png;base64," + movie.image.data}
                    alt={movie.name + " stretched"}
                />
            </div>
            <div className={"image imageTwo"}>
                <img
                    src={"data:image/png;base64," + movie.image.data}
                    alt={movie.name}
                />
            </div>
            <div className={"movieName"}>{movie.name}</div>
            <div className={"tag"}>{movie.tags[0].name}</div>
        </div>
    );
}
