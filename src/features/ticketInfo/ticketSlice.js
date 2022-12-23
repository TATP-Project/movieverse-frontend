import { createSlice } from "@reduxjs/toolkit";

const initTicketId = {};

export const ticketIdSlice = createSlice({
    name: "ticketId",
    initialState: initTicketId,
    reducers: {
        setTicketId: (state, action) => {
            return action.payload;
        },
    },
});

export const { setTicketId } = ticketIdSlice.actions;

export default ticketIdSlice.reducer;
