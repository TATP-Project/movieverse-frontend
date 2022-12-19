import React from "react";
import MovieInfo from "../features/movieTimeslots/MovieInfo";
import MovieSessions from "../features/movieTimeslots/MovieSessions";

export default function MovieTimeslotsPage() {
    return (
        <>
            <div className={"title"}>Now on Sale</div>
            <div className={"body"}>
                <MovieInfo />
                <MovieSessions />
            </div>
        </>
    );
}
