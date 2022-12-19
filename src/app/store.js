import { configureStore } from "@reduxjs/toolkit";
import seatSelectionReducer from "../features/seats/seatSelectionSlice";

export const store = configureStore({
  reducer: {
    seatSelection: seatSelectionReducer,
  },
});
