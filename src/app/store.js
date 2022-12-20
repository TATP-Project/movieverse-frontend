import { configureStore } from "@reduxjs/toolkit";
import seatSelectionReducer from "../features/seats/seatSelectionSlice";
import movieReducer from "../features/movie/movieSlice";
import movieSessionReducer from "../features/movieTimeslots/movieSessionSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        movieSession: movieSessionReducer,
        seatSelection: seatSelectionReducer,
    },
});
