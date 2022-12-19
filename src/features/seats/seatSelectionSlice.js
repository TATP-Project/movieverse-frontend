import { createSlice } from "@reduxjs/toolkit";

const initseatSelection = [];

export const seatSelectionSlice = createSlice({
  name: "seatSelection",
  initialState: initseatSelection,
  reducers: {
    setSeatSelection(state, action) {
      return action.payload;
    },
  },
});

export const { setSeatSelection } = seatSelectionSlice.actions;
export default seatSelectionSlice.reducer;
