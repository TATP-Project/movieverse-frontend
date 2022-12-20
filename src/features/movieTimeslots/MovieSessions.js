import React, { useState } from "react";
import TimeslotDropdown from "./TimeslotDropdown";
import { useEffect, useCallback } from "react";
import { getMovieSessions } from "../../api/movies";
import { useSelector } from "react-redux";
import "./MovieSessions.css";

export default function MovieSessions() {
    const movieId = useSelector((state) => state.movie.id);
    const [movieSession, setMovieSession] = useState([]);
    const [uniqueCinemas, setUniqueCinemas] = useState([]);
    const [selectedDropdown, setSelectedDropdown] = useState(-1);

    const wrapperSetSelectedDropdown = useCallback(
        (val) => {
            setSelectedDropdown(val);
        },
        [setSelectedDropdown]
    );

    useEffect(() => {
        getMovieSessions(movieId).then((response) => {
            // response.data.filter(function(session){
            //     session.cinema.id
            // })
            var cinemas = response.data.map((session) => session.cinema);
            var uniqueCinemas = cinemas.filter(
                (value, index, self) =>
                    index === self.findIndex((t) => t.id === value.id)
            );
            setUniqueCinemas(uniqueCinemas);
            setMovieSession(response.data);
        });
    }, [movieId]);

    return (
        <div className="movieSession">
            <div className="sessionTitle">Session</div>
            <div className="movieSessionGroup">
                {" "}
                {uniqueCinemas.map((cinema, index) => {
                    var sessionList = movieSession.filter(
                        (movie) => movie.cinema.id === cinema.id
                    );
                    return (
                        <>
                            <div style={{ color: "orange" }}>
                                {cinema.district}
                            </div>
                            <div>{cinema.name}</div>

                            <TimeslotDropdown
                                sessions={sessionList}
                                showMenu={index === selectedDropdown}
                                setSelectedDropdown={wrapperSetSelectedDropdown}
                                index={index}
                            />
                        </>
                    );
                })}
            </div>
        </div>
    );
}
