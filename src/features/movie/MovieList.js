import React, { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../../api/movies";
import MovieCard from "./MovieCard";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getMovies().then((response) => {
            setMovies(response.data);
        });
    }, []);
    return movies.map((movie, index) => {
        return <MovieCard movie={movie} key={index} />;
    });
}
