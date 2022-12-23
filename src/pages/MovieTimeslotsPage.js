import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MovieInfo from "../features/movieTimeslots/MovieInfo";
import MovieSessions from "../features/movieTimeslots/MovieSessions";
import BackToHomeButton from "../features/button/BackToHomeButton";

export default function MovieTimeslotsPage() {
    const history = useSelector((state) => state.history);
    const criticalSection = ["/food", "/ticketinfo", "/complete"];
    useEffect(() => {
        //console.log(history)
    }, [history]);
    return !criticalSection.includes(history) ? (
        <>
            <div className={"title"}>Now on Sale</div>
            <div className={"body"}>
                <MovieInfo />
                <MovieSessions />
            </div>
        </>
    ) : (
        <BackToHomeButton />
    ); //incorrect history
}
