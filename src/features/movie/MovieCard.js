import React from "react";
import "./MovieCard.css";
import { setSelectedMovie } from "./movieSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pushHistory } from "../history/historySlice";

export default function MovieCard(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { movie } = props;
    const selectMovie = () => {
        dispatch(setSelectedMovie(movie));
        dispatch(pushHistory('/movie-timeslots'));
        navigate("/movie-timeslots");
    };
    return (
        <div className={"movieCard"} onClick={selectMovie}>
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
