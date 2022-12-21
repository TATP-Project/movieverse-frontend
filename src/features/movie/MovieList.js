import React, { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../../api/movies";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList(props) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getMovies().then((response) => {
            setMovies(response.data);
        });
    }, []);
    return (
        <div className={"list"}>
            {console.log(props.filterTags)}
            {movies
                //Filter by Genre (OR)
                .filter((movie, index) => {
                    if (props.filterTags.genre.length === 0) {
                        return true
                    } else {
                        return movie.tags.filter(tag =>
                            props.filterTags.genre.includes(tag.name.toUpperCase())
                        ).length > 0
                    }
                })
                //AND
                //Filter by Type (OR)
                .filter((movie, index) => {
                    if (props.filterTags.type.length === 0) {
                        return true
                    } else {
                        return movie.tags.filter(tag =>
                            props.filterTags.type.includes(tag.name.toUpperCase())
                        ).length>0
                    }
                })
                //render card     
                .map((movie, index) => {
                    return <MovieCard movie={movie} key={index} />;
                })}
        </div>
    );
}
