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
            {movies.filter((movie,index)=>{
                if(props.filterTags.length===0){
                    return true
                }else{
                    return movie.tags.filter(tag=>
                        props.filterTags.includes(tag.name.toUpperCase())
                    ).length==props.filterTags.length                    
                }
            })
            .map((movie, index) => {
                return <MovieCard movie={movie} key={index} />;
            })}
        </div>
    );
}
