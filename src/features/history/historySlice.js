import { createSlice } from "@reduxjs/toolkit";

const initHistory = "/";

export const historySlice = createSlice({
    name: "history",
    initialState: initHistory,
    reducers: {
        pushHistory: (state, action) => {
            return action.payload
        },
    },
});

export const { pushHistory } = historySlice.actions;

export default historySlice.reducer;