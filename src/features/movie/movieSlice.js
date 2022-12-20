import { createSlice } from "@reduxjs/toolkit";

const initMovie = {};

export const movieSlice = createSlice({
    name: "movie",
    initialState: initMovie,
    reducers: {
        setSelectedMovie: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;
