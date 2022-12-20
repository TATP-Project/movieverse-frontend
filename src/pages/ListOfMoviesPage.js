import React from "react";
import MovieList from "../features/movie/MovieList";
import "./commonStyles.css";

export default function ListOfMoviesPage() {
    return (
        <>
            <div className={"title"}>Now on cinemas</div>
            <div className={"body"}>
                <MovieList />
            </div>
        </>
    );
}
