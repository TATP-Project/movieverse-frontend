import { createSlice } from "@reduxjs/toolkit";

const initSeatSelection = {
  movieSessionId: "",
  seats: [],
};

export const seatSelectionSlice = createSlice({
  name: "seatSelection",
  initialState: initSeatSelection,
  reducers: {
    setSeatSelection(state, action) {
      return action.payload;
    },
  },
});

export const { setSeatSelection } = seatSelectionSlice.actions;
export default seatSelectionSlice.reducer;
