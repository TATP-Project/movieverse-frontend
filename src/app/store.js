import { configureStore } from "@reduxjs/toolkit";
import seatSelectionReducer from "../features/seats/seatSelectionSlice";
import movieReducer from "../features/movie/movieSlice";
import movieSessionReducer from "../features/movieTimeslots/movieSessionSlice";
import foodSelectionReducer from "../features/food/foodSlice";
import loadingReducer from "../features/loading/loadingSlice";
import ticketIdReducer from "../features/ticketInfo/ticketSlice";
import countdownTimerReducer from "../features/counter/countdownTimerSlice"
import historyReducer from "../features/history/historySlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        movieSession: movieSessionReducer,
        seatSelection: seatSelectionReducer,
        foodSelection: foodSelectionReducer,
        loading: loadingReducer,
        ticketId: ticketIdReducer,
        countdownTimer: countdownTimerReducer,
        history: historyReducer
    },
});
