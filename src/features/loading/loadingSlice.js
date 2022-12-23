import { createSlice } from "@reduxjs/toolkit";

const initLoading = 0;

export const loadingSlice = createSlice({
    name: "loading",
    initialState: initLoading,
    reducers: {
        toggleLoading: (state, action) => {
            return state+action.payload;//semaphore
        },
    },
});

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;