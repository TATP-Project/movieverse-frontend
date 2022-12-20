import React from "react";
import SeatSelection from "../features/seats/SeatSelection";

export default function SeatSelectionPage() {
  return (
    <>
      <div className={"title"}>Now on Sale</div>
      <div className={"body"}>
        <SeatSelection />
      </div>
    </>
  );
}
