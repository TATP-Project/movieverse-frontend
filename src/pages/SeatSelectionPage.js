import React from "react";
import StatusBar from "../features/movie/StatusBar";
import SeatSelection from "../features/seats/SeatSelection";

export default function SeatSelectionPage() {
  return (
    <div className={"body"}>
      <StatusBar stage={1} />
      <SeatSelection />
    </div>
  );
}
