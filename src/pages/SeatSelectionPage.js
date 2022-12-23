import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StatusBar from "../features/movie/StatusBar";
import SeatSelection from "../features/seats/SeatSelection";
import BackToHomeButton from "../features/button/BackToHomeButton";

export default function SeatSelectionPage() {
    const history = useSelector((state) => state.history);
    const criticalSection = ["/food", "/ticketinfo", "/complete"];
    useEffect(() => {
        //(history)
    }, [history]);
    return !criticalSection.includes(history) ? (
        <div className={"body"}>
            <StatusBar stage={1} />
            <SeatSelection />
        </div>
    ) : (
        <BackToHomeButton />
    ); //incorrect history
}
