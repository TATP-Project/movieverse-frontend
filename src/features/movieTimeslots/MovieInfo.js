import React from "react";
import { useSelector } from "react-redux";
import "./MovieInfo.css";

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
                        <div>
                            <img src={genreLogo} alt="genre" />
                        </div>
                        <div className={"tableHeader"}>Genre</div>
                        <div>{movie.tags[0].name}</div>
                        <div>
                            <img src={timeLogo} alt="time" />
                        </div>
                        <div className={"tableHeader"}>RunningTime</div>
                        <div>
                            {movie.releaseDate.slice(
                                0,
                                movie.releaseDate.indexOf("T")
                            )}
                        </div>
                        <div>
                            <img src={dateLogo} alt="date" />
                        </div>
                        <div className={"tableHeader"}>ReleaseDate</div>
                        <div>{movie.runningTime}</div>
                        <div>
                            <img src={languageLogo} alt="language" />
                        </div>
                        <div className={"tableHeader"}>Language</div>
                        <div>{movie.language}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
