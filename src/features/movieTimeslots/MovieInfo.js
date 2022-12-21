import React from "react";
import { useSelector } from "react-redux";
import "./MovieInfo.css";
import MovieInfoItem from "./MovieInfoItem";

export default function MovieInfo() {
    const movie = useSelector((state) => state.movie);
    var dateLogo = require("../../icons/movieTimeslots/Date.png");
    var genreLogo = require("../../icons/movieTimeslots/Genre.png");
    var languageLogo = require("../../icons/movieTimeslots/Language.png");
    var timeLogo = require("../../icons/movieTimeslots/Time.png");
    return (
        <div>
            {""}
            <img
                className={"backgroundImage"}
                src={"data:image/png;base64," + movie.image.data}
                alt={movie.name}
            />
            <div className={"foreground"}>
                <div>
                    <img
                        className={"infoImage"}
                        src={"data:image/png;base64," + movie.image.data}
                        alt={movie.name}
                    />
                </div>
                <div className={"info"}>
                    <div className={"movieTitle"}>{movie.name}</div>
                    <hr />
                    <div className={"infoItems"}>
                        <MovieInfoItem
                            logo={genreLogo}
                            alt="genre"
                            header="Genre"
                            value={movie.tags[0].name}
                        />
                        <MovieInfoItem
                            logo={dateLogo}
                            alt="date"
                            header="Release Date"
                            value={movie.releaseDate.slice(
                                0,
                                movie.releaseDate.indexOf("T")
                            )}
                        />
                        <MovieInfoItem
                            logo={timeLogo}
                            alt="time"
                            header="Running Time"
                            value={movie.runningTime + " Minutes"}
                        />
                        <MovieInfoItem
                            logo={languageLogo}
                            alt="language"
                            header="Language"
                            value={movie.language}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
