import React, { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../../api/movies";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getMovies().then((response) => {
            setMovies(response.data);
        });
    }, []);
    return (
        <div>
            <div className={"title"}>Now on cinemas</div>
            <div className={"list"}>
                {movies.map((movie, index) => {
                    return <MovieCard movie={movie} key={index} />;
                })}
            </div>
        </div>
    );
}
