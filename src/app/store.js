import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movie/movieSlice";
import movieSessionReducer from "../features/movieTimeslots/movieSessionSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        movieSession: movieSessionReducer,
    },
});
