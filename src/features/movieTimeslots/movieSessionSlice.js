import { createSlice } from "@reduxjs/toolkit";

const initMovieSession = {};

export const movieSessionSlice = createSlice({
    name: "movieSession",
    initialState: initMovieSession,
    reducers: {
        setMovieSession: (state, action) => {
            return action.payload;
        },
    },
});

export const { setMovieSession } = movieSessionSlice.actions;

export default movieSessionSlice.reducer;
