import React from "react";
import MovieList from "../features/movie/MovieList";
import { Link } from "react-router-dom";
import "./commonStyles.css";

export default function ListOfMoviesPage() {
    return (
        <div>
            <div className={"title"}>Now on cinemas</div>
            <MovieList />
            <Link to="/movie-timeslots">
                <span>select movie</span>
            </Link>
        </div>
    );
}
