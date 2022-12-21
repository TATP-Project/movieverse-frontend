import { configureStore } from "@reduxjs/toolkit";
import seatSelectionReducer from "../features/seats/seatSelectionSlice";
import movieReducer from "../features/movie/movieSlice";
import movieSessionReducer from "../features/movieTimeslots/movieSessionSlice";
import foodSelectionReducer from "../features/food/foodSlice";
import ticketIdReducer from "../features/ticketInfo/ticketSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        movieSession: movieSessionReducer,
        seatSelection: seatSelectionReducer,
        foodSelection: foodSelectionReducer,
        ticketId: ticketIdReducer,
    },
});
