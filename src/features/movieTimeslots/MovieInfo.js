import React from "react";
import { useSelector } from "react-redux";

export default function MovieInfo() {
    const movie = useSelector((state) => state.movie);
    return <div>MovieInfo</div>;
}
